
        function clicked(){
        var dataSize = document.getElementById("dataSize").value;
        var dataSpeed = document.getElementById("dataSpeed").value;
        var dataType = document.getElementById("dataType").value;
        var speedType = document.getElementById("speedType").value;
        var Size;
        var Type;
        if(dataType === "KB")
        Size = dataSize;
        else if(dataType === "MB")
        Size = dataSize*1024;
        else if(dataType === "GB")
        Size = dataSize*1024*1024;
        else if(dataType === "TB")
        Size = dataSize*1024*1024*1024;

        if(speedType === "KBPS")
        Type = dataSpeed;
        else if(speedType === "MBPS")
        Type = dataSpeed*1024;
        else if(speedType === "GBPS")
        Type = dataSpeed*1024*1024;
        else if(speedType === "TBPS")
        Type = dataSpeed*1024*1024*1024;
    
        var Time = Size/Type;
        var sec=0;
        var min=0;
        var hour=0;
        var day=0;
        if(Time>60)
        {
            min = Math.floor(Time/60);
            sec = Time%60;
        }
        if(min>60)
        {
            hour = Math.floor(min/60);
            min = min%60;
        }
        if(hour>24)
        {
            day = Math.floor(hour/24);
            hour = hour%24;
        }
        if(day===0)
        document.getElementById("txt").innerHTML=`${hour}HR ${min}MIN ${Math.round(sec)}SEC`;
        else
        document.getElementById("txt").innerHTML=`${day}DAY ${hour}HR ${min}MIN ${Math.round(sec)}SEC`;
    }