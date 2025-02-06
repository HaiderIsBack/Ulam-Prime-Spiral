
class UlamSpiral{
    constructor(x, y){
        this.currX = x;
        this.currY = y;
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.value = 1;
        this.stepSize = 10;
        this.direction = 0; // 0 = right, 1 = up, 2 = left, 3 = down
        this.stepsInCurrentDirection = 1;
        this.stepsTaken = 0;
        this.turns = 0;
    }

    isPrime(num){
        if(num < 2) return false;
        for(let i = 2; i <= Math.sqrt(num); i++){
            if(num % i === 0) return false;
        }
        return true;
    }

    draw(ctx){
        if(this.isPrime(this.value)){
            ctx.fillStyle = "white";
            ctx.fillRect(this.currX, this.currY, 3, 3);
        }
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.currX, this.currY);

        ctx.strokeStyle = "#777";
        ctx.stroke();
    }

    update(ctx){
        this.draw(ctx);

        this.prevX = this.currX;
        this.prevY = this.currY;
        
        switch (this.direction){
            case 0: this.currX += this.stepSize; break;
            case 1: this.currY -= this.stepSize; break;
            case 2: this.currX -= this.stepSize; break;
            case 3: this.currY += this.stepSize; break;
        }

        this.stepsTaken++;
        if(this.stepsTaken === this.stepsInCurrentDirection){
            this.stepsTaken = 0;
            this.direction = (this.direction + 1) % 4;

            this.turns++;
            if (this.turns % 2 === 0) {
                this.stepsInCurrentDirection++;
            }
        }

        this.value++;
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    const canvas = document.getElementById("mainCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 500;

    const spiral = new UlamSpiral(canvas.width/2, canvas.height/2);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function animate(){
        spiral.update(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})