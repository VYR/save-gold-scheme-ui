import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-public-access-home',
  templateUrl: './public-access-home.component.html',
  styleUrls: ['./public-access-home.component.scss']
})
export class PublicAccessHomeComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', '','',''],
    responsive: {
      0: {
        items: 1
      },   
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
  }

  slidesStore = [
    {img: "assets/images/save-gold-1.png",id:"1"},
    {img: "assets/images/save-gold-2.png",id:"2"},
    {img: "assets/images/save-gold-3.png",id:"3"},
    {img: "assets/images/save-gold-4.png",id:"4"},
    {img: "assets/images/save-gold-5.png",id:"5"},
    {img: "assets/images/save-gold-6.png",id:"6"},
    {img: "assets/images/save-gold-7.png",id:"7"},
    {img: "assets/images/save-gold-8.png",id:"8"},
    {img: "assets/images/save-gold-9.png",id:"9"},
    {img: "assets/images/save-gold-10.png",id:"10"} 
  ];
  

}
