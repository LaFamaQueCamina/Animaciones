import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  icono = "oscuro"

  constructor(
    private anim:AnimationController
  ) { }

  cambiarTema(){
    if(this.icono == "oscuro"){
      document.documentElement.style.setProperty("--fondo1", "#2e3239")
      document.documentElement.style.setProperty("--fondo-input", "#636363")
      document.documentElement.style.setProperty("--placeholder", "#ffffff")

      this.icono = "claro"
    }else{
      document.documentElement.style.setProperty("--fondo1", "#454E5F")
      document.documentElement.style.setProperty("--fondo-input", "#ffffff")
      document.documentElement.style.setProperty("--placeholder", "#939393")
      this.icono = "oscuro"
    }
  }

  ngOnInit() {
    this.anim.create()
    .addElement(document.querySelector("#logo")!)
    .duration(2000)
    .iterations(Infinity)
    .direction("alternate")
    .fromTo("color", "#6DDC98", "#51C8F0")
    .fromTo("transform", "rotate(-20deg)", "rotate(20deg)")
    .play()
  }

  async animarError(index:number){
    await Haptics.vibrate();
    this.anim.create()
    .addElement(document.querySelectorAll("input")[index])
    .duration(100)
    .iterations(3)
    .keyframes([
      {offset: 0, transform: "translateX(0px)", border: "1px transparent solid"},
      {offset: 0.25, transform: "translateX(-5px)", border: "1px red solid"},
      {offset: 0.50, transform: "translateX(0px)", border: "1px transparent solid"},
      {offset: 0.75, transform: "translateX(5px)", border: "1px red solid"},
      {offset: 1, transform: "translateX(0px)", border: "1px transparent solid"},
    ]).play()
  }

}
