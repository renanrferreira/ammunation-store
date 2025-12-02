import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { CountUpComponent } from '../count-up/count-up';

@Component({
  selector: 'app-tilted-card',
  imports: [CommonModule,CountUpComponent],
  templateUrl: './tilted-card.html',
  styleUrl: './tilted-card.css',
})
export class TiltedCard {
  @Input() imageSrc: string = '';
  @Input() altText: string = 'Tilted card image';
  @Input() captionText: string = '';
  @Input() containerHeight: string = '480px';
  @Input() containerWidth: string = '100%';
  @Input() imageHeight: string = '480px';
  @Input() imageWidth: string = '300px';
  @Input() scaleOnHover: number = 1.1;
  @Input() rotateAmplitude: number = 14;
  @Input() showMobileWarning: boolean = true;
  @Input() showTooltip: boolean = true;
  @Input() displayOverlayContent: boolean = false;
  @Input() priceField1: string = '';
  @Input() priceField2: string = '';
  @Input() viewsField: number = 0;
  @Input() viewInterval: number = 3000;
  @ViewChild('cardFigure') cardFigureRef!: ElementRef<HTMLElement>;

  public cardTransform: string = 'scale(1) rotateX(0deg) rotateY(0deg)';
  public captionTransform: string = 'rotate(0deg)';
  public captionOpacity: number = 0;
  public captionX: number = 0;
  public captionY: number = 0;

  private lastY: number = 0;

  handleMouse(e: MouseEvent) {
    if (!this.cardFigureRef) return;

    const rect = this.cardFigureRef.nativeElement.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -this.rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * this.rotateAmplitude;

    this.cardTransform = `scale(${this.scaleOnHover}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    this.captionX = e.clientX - rect.left;
    this.captionY = e.clientY - rect.top;

    const velocityY = offsetY - this.lastY;
    this.captionTransform = `rotate(${-velocityY * 0.6}deg)`;
    this.lastY = offsetY;
  }

  handleMouseEnter() {
    this.cardTransform = `scale(${this.scaleOnHover}) rotateX(0deg) rotateY(0deg)`;
    this.captionOpacity = 1;
  }

  handleMouseLeave() {
    this.cardTransform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    this.captionOpacity = 0;
    this.captionTransform = 'rotate(0deg)';
  }
}

