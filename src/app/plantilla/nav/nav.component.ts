import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppModule } from 'src/app/app.module';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('asNav',{static: true}) nav!: ElementRef;

  constructor(private rendere2:Renderer2, private router: Router,){

  }
  ngOnInit(): void {
    console.log()
  }

  
  


}
