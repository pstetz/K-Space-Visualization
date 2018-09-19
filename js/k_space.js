function HeatmapGLfromImage() {
    let img = new Image();
    img.setAttribute(
        "src",
        processdata(
            "https://images.plot.ly/plotly-documentation/images/heatmap-galaxy.jpg")
    );
}
function processdata(url) {
    let canvas = document.getElementById("k_space_canvas");
    let kspace = document.getElementById("k_space");
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    let context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    let w = img.width; let h = img.height;
    let l = w * h;
    let arr = context.getImageData(0, 0, w, h).data;

    let zdata = [];
    for (let i = 0; i < l; i++) {
        // get color of pixel
        let r = arr[i * 4]; // Red
        let g = arr[i * 4 + 1]; // Green
        let b = arr[i * 4 + 2]; // Blue
        let a = arr[i * 4 + 3]; // Alpha
        zdata.push(r + g + b + a);
    }
    let createGroupedArray = function(arr, chunkSize) {
        let groups = [],
            i;
        for (i = 0; i < arr.length; i += chunkSize) {
            groups.push(arr.slice(i, i + chunkSize));
        }
        return groups;
    };
    // Grouping zdata into 500x500
    zdata = createGroupedArray(zdata, 500);

    let data = [
        {
            z: zdata,
            type: "heatmapgl",
            colorscale: "Picnic",
            showscale: false,
        }
    ];

    let axisTemplate = {
      showgrid: false,
      showticklabels: false,
      ticks: ''
    };

    let layout = {
      xaxis: axisTemplate,
      yaxis: axisTemplate,
    };

    Plotly.plot(kspace, {
        data: data,
        layout: layout,
    });
}

HeatmapGLfromImage();
