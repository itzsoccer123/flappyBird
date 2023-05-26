let flappy 
let borders = []
let screen_size = 600
let reset_button
let message = ""
let fullscreen_button 
let lvl_1 = 200

let pause = false
num_of_tap_space_bar = 0

scores = [0]
// const network = new  brain.NeuralNetwork(3,4,1);
// // network.train([
// //     {input: [], output:1 },
// // ])
let data = []
// data.push( {input: [0,0], output:1 },)
// network.train(data)

let done_training = false 


function setup() {
    reset_button = new buttton(300,700,500,75,"RESTART GAME",50)
    fullscreen_button = new buttton(300,800,500,75,"FULLSCREEN",50)
    message = ""
    borders = []
    num_of_tap_space_bar = 0
	createCanvas(screen_size, screen_size+300);
   
    flappy = new bird(50,350,30,20)
  //  borders.push(new border(500,100,100,300,lvl_1))
   //  borders.push(new border(500,100,100,random(150,400),lvl_1))
 borders.push(new border(500,100,100,random(150,400),lvl_1))
    loop();
}
function preload() {
    bird_guy = loadImage("bird.png")
    pipe_top= loadImage("pipe_top.png")
    pipe_bottom = loadImage("pipe_bottom.png")
    bg = loadImage("bg.png")
  //  = loadImage(".png")   
}

function draw() {
    rectMode(CENTER)
    imageMode(CENTER)
    background(225)
    image(bg,screen_size/2,screen_size/2,screen_size,screen_size)
    if (done_training == false && flappy.start_game) {
        // time to train AI 
        let data_ ={input: [flappy.y/600,(flappy.x - borders[0].x)/600,borders[0].y], output:[keyIsDown(32)]}
        if (keyIsDown(32)) {
            data_.output = [Math.random()*.5+.5]
        }else {
            data_.output = [Math.random()*.5]
            
        }
        // print(borders)
// data.push( {input: [flappy.y,dist(flappy.x,0,borders[borders.length-1].x,0)], output:keyIsDown(32)},)
data.push( data_)
        // print(data_)
        // ellipse(data_.input[0]*100,data_.input[1]*100,10,10)
        
    }else if (done_training) {
        // if (network.run([Math.abs(flappy.x,0,borders[borders.length-1].x,0])) {
        // if (network.run([flappy.y,dist(flappy.x,0,borders[borders.length-1].x,0)])[0] >= .5) {
        // print(network.run([flappy.y/600,(flappy.x - borders[0].x)/600,borders[0].y])) 
        // if   (network.run([flappy.y/600,(flappy.x - borders[0].x)/600,borders[0].y])[0]>.5) {
        //     flappy.jump()
        //     // print('ai jump')
        //     // print(network.run([flappy.y,dist(flappy.x,0,borders[borders.length-1].x,0)]))
        //     // print(network.run([0,0])[0])
        // }else {
        //     // print(network.run([flappy.y,dist(flappy.x,0,borders[borders.length-1].x,0)]))
        //     // print('ai decide not to  jump')
        //     // print(network.run([0,0])[0])
        //    // print(network.run([flappy.y/600,(flappy.x - borders[0].x)/600]))
        //                     // X       F
        // }
    }
   if (flappy.game_over == true) {
       // print("you DIED")
       message = "Game Over"
       noLoop();
       // print(data)
   }
   for (i of borders) {
        i.green()
        i.show()
        i.left()
        i.collision()
   }
   fill(0,0,0)
   textSize(100)
   text("Score: "+flappy.score,190,100)
   textSize(50)
   text(message,200,400)
  
    textSize(20)
    text("Hight Score: " + max(scores),500,20)
   
    flappy.show()
    flappy.fall()
    
// seeing if borders left the screen 
   if (left_screen()) {
       borders.push(new border(700,100,100,random(150,400),lvl_1))
       flappy.collect()
   //    textSize(20)
   // text("Hight Score: " + max(scores),500,20)
        //borders.push(new border(700,100,100,random(150,400),lvl_1))
   }
   reset_button.red()
   reset_button.show()
   fullscreen_button.blue()
   fullscreen_button.show()
    while (pause) {

    }

 

}
function print(x) {
    console.log(x)
}
function keyPressed() {
// starting game and jumping
    // if (key.toLowerCase()=="p") {
    //     done_training = true 
    //     print('ai started')
    //     let training_data = data.slice(-50)
    //     print(training_data)
    //     // network.train(training_data)
    //     print('ai done')
        
    // }
    if (key === " " && num_of_tap_space_bar === 0) {
        flappy.start_game = !(flappy.start_game)
        num_of_tap_space_bar += 1
    }
     if (key === " ") {
         if (done_training) {
             // if ()
         }else {
             
        flappy.jump()
         }
      //  print("h")
      num_of_tap_space_bar += 1
    }
    if (key.toLowerCase() === "e") {
        print("e is pressed" + "\n Game Reset")
     //     scores.push(flappy.score)
     if (flappy.game_over == false) {
                    scores.push(flappy.score)
                }
        setup()
      //  draw()
    }
    if (key.toLowerCase()=== "l") {
        pause = !(pause)
    }
    if (key.toLowerCase()=== "f") {
        let fs = fullscreen();
       fullscreen(!fs);
       

    }
}

function touchStarted() {
    if (num_of_tap_space_bar === 0) {
        flappy.start_game = !(flappy.start_game)
        num_of_tap_space_bar += 1
    }
    if (screen_taped()) {
        flappy.jump()
    }
      //  flappy.jump()
      //  print("h")
      num_of_tap_space_bar += 1
    if (reset_button.clicked()) {
       //  scores.push(flappy.score)
       if (flappy.game_over == false) {
                    scores.push(flappy.score)
                }
        reset_button.reset_game()
        
    }
    if (fullscreen_button.clicked()) {
        fullscreen_button.fullscreen_mode()
    }
  //  if (key.toLowerCase() === "e") {
}
// function (params) {
    
// }
class bird {
    constructor(x,y,w,h) {
    
this.x = x
this.y = y
this.w = w
this.h = h
this.gravity = 2
this.jump_speed = this.gravity *45
this.game_over = false
this.start_game = false 
this.score = 0
this.passing_each_column = 1
        // this.brain = new brain.neuralNetwork()
    }
    show() {
        fill(255,0,0)
        //rect(this.x,this.y,this.w,this.h)
        image(bird_guy,this.x,this.y,this.w,this.h)
    }
    fall() {
        if (this.start_game === true) {
            if (this.y < screen_size - this.w/2) {
                this.y += this.gravity
            }else {
                if (this.game_over == false) {
                    scores.push(this.score)
                }
                this.game_over = true
                
            }
        }
    }
    jump() {
       if (this.y >( 0+ this.w/2 + this.jump_speed )) {
            this.y -= this.jump_speed
          
         }else if (this.y >( 0+ this.w/2 )) {
             this.y = 0 +this.w/2 
         }  
    }
    collect() {
        if (this.game_over === false) {
             this.score += this.passing_each_column
        }
    }
}
class border {
    constructor(x,y,w,h,spacing) {
        this.spacing = spacing
        this.w = w
        this.x = x
        this.y = w/2
        this.h = h
        this.move_speed = 2
        this.x2 = x 
        this.w2 = w 
        this.h2 =screen_size - (this.y + this.h/2 + this.spacing )
        this.y2 = screen_size - this.h2/2 // (this.y + this.h/2+ this.spacing + this.h/2)
        
        

        
    }
    green() {
        fill(0,255,0)
    }
    show() {
       // strokeWeight(10)
       // rect(this.x,this.y,this.w,this.h)
       image(pipe_top,this.x,this.y,this.w,this.h)
       // fill(0,0,255)
        //strokeWeight(1)
        // rect(this.x2,this.y2,this.w2,this.h2)
        image(pipe_bottom,this.x2,this.y2,this.w2,this.h2)
      
      
    }
    left() {
        if (flappy.start_game == true) {
            this.x -= this.move_speed
            this.x2 -= this.move_speed
        }
    }
 
    collision() {
        // top column 
        if ((flappy.y - flappy.w/2 < this.y + this.h/2 ) && (flappy.x + flappy.w/2 <this.x+this.w/2) && (flappy.x - flappy.w/2>this.x-this.w/2)) {
          //  print("over by top column ")
                if (flappy.game_over == false) {
                    scores.push(flappy.score)
                }
            flappy.game_over = true
        }
        // bottom column 
       if ((flappy.y+ flappy.w > screen_size - this.h2)/*(flappy.y  > this.y - this.w/2 )*/ && (flappy.x + flappy.w/2 <this.x2+this.w2/2) && (flappy.x - flappy.w/2>this.x2-this.w2/2)) {
           if (flappy.game_over == false) {
                scores.push(flappy.score)
           }
            flappy.game_over = true 
         //  print("you DIED by bottom column ")
           //print((flappy.y - flappy.h/2 > this.y - this.w/2 ))
           //print (flappy.x + flappy.w/2 <this.x+this.w/2)
           //print(flappy.x - flappy.w/2>this.x-this.w/2)    
        }
    }
}

function left_screen() {
    for (let i=0;i<borders.length;i++) {
        if (borders[i].x < 0 - borders[i].w/2) {
            borders.splice(i,1)
            return true
        }else {
            return false 
        }
    }
}
class buttton {
    constructor(x,y,w,h,words,the_szie) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.message = words
        this.size = the_szie
    }
    red() {
        fill(255,0,0)
    }
    blue() {
        fill(0,0,255)
    }
    show() {
        rectMode(CENTER)
        rect(this.x,this.y,this.w,this.h)
        fill(0,255,0)
        textSize(this.size)
        textAlign(CENTER, CENTER);
        text(this.message,this.x,this.y)
       // text(this.message,this.x-this.w/2,this.y+10)
    }
    clicked() {
        // x part 
         if ((abs(mouseX - this.x) <= this.w/2 ) && (abs(mouseY - this.y) <= this.h/2 )) { //)) {
           // this.reset_game()
           return true
         } else {
             return false
         }
    }
    reset_game() {
        // loop();
        setup()
    }
    fullscreen_mode() {
           let fs = fullscreen();
       fullscreen(!fs);
    }
    
}
function screen_taped() {
    if ((mouseX>0 && mouseX < screen_size) && (mouseY>0 && mouseY < screen_size)) {
        return true 
    }else {
        return false
    }
}

/*
// update in near future 
1) collision detction |\
2) auto spawning borders |/
3) 3 lvls easy medium aand hard 
4) title called flappy birrd in cooll font that goes a way when game start 
5 ) background moves , the flappy bird image on char, border with image |\
6) background moves // animation |\
7)SCORE |\
8) random column size |\ 
9) printing game game_over |\
*/