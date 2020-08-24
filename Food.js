class Food {
    constructor() {
        this.image = loadImage("images/Milk (2).png");
        this.foodStock;
        this.lastFed;
    }

    getFoodStock(){ 
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock > 0){
          this.foodStock = this.foodStock - 1;
        }
    }
    
     getFedTime(lastFed){
        this.lastFed = lastFed;
   }

    bedroom() {
        background(bedroomImg, 550, 500);
    }

    garden() {
        background(gardenImg, 550, 500);
    }

    restroom() {
        background(restroomImg, 550, 500);
    }

    display() {
        background(46, 139, 87);

        fill(255, 255, 255);
        textSize(15);
        
        
        var x = 80;
        var y = 100;

        imageMode(CENTER);

        if (this.foodStock != 0) {
            for(var i = 0; i < this.foodStock; i++) {
                if (i%10 === 0) {
                    x = 80;
                    y = y + 50;
                }
         
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }   
};