import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-staggered-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staggered-menu.html',
  styleUrls: ['./staggered-menu.css']
})
export class StaggeredMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() position: 'left' | 'right' = 'right';
  @Input() colors: string[] = ['#B19EEF', '#5227FF'];
  @Input() items: StaggeredMenuItem[] = [];
  @Input() socialItems: StaggeredMenuSocialItem[] = [];
  @Input() displaySocials: boolean = true;
  @Input() displayItemNumbering: boolean = true;
  @Input() logoUrl: string = 'logo.png';
  @Input() menuButtonColor: string = '#fff';
  @Input() openMenuButtonColor: string = '#fff';
  @Input() changeMenuColorOnOpen: boolean = true;
  @Input() accentColor: string = '#5227FF';
  @Input() isFixed: boolean = false;

  @Output() menuOpen = new EventEmitter<void>();
  @Output() menuClose = new EventEmitter<void>();

  public open: boolean = false;
  public textLines: string[] = ['Menu', 'Close'];
  public preLayerColors: string[] = [];

  @ViewChild('panel') panelRef!: ElementRef<HTMLDivElement>;
  @ViewChild('preLayers') preLayersRef!: ElementRef<HTMLDivElement>;
  @ViewChild('plusH') plusHRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('plusV') plusVRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('icon') iconRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('textInner') textInnerRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('toggleBtn') toggleBtnRef!: ElementRef<HTMLButtonElement>;

  private preLayerEls: HTMLElement[] = [];
  private openTl: gsap.core.Timeline | null = null;
  private closeTween: gsap.core.Tween | null = null;
  private spinTween: gsap.core.Tween | null = null;
  private textCycleAnim: gsap.core.Tween | null = null;
  private colorTween: gsap.core.Tween | null = null;
  private busy: boolean = false;
  private itemEntranceTween: gsap.core.Tween | null = null;
  private ctx!: gsap.Context;

  constructor() {}

  ngOnInit(): void {
    const raw = this.colors && this.colors.length ? this.colors.slice(0, 4) : ['#1e1e22', '#35353c'];
    let arr = [...raw];
    if (arr.length >= 3) {
      const mid = Math.floor(arr.length / 2);
      arr.splice(mid, 1);
    }
    this.preLayerColors = arr;
  }

  ngAfterViewInit(): void {
    this.ctx = gsap.context(() => {
      const panel = this.panelRef.nativeElement;
      const preContainer = this.preLayersRef.nativeElement;
      const plusH = this.plusHRef.nativeElement;
      const plusV = this.plusVRef.nativeElement;
      const icon = this.iconRef.nativeElement;
      const textInner = this.textInnerRef.nativeElement;

      this.preLayerEls = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];

      const offscreen = this.position === 'left' ? -100 : 100;
      gsap.set([panel, ...this.preLayerEls], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      gsap.set(this.toggleBtnRef.nativeElement, { color: this.menuButtonColor });
    });
  }

  ngOnDestroy(): void {
    this.ctx.revert();
  }

  buildOpenTimeline(): gsap.core.Timeline | null {
    const panel = this.panelRef.nativeElement;
    const layers = this.preLayerEls;
    if (!panel) return null;

    this.openTl?.kill();
    this.closeTween?.kill();
    this.itemEntranceTween?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(panel, { xPercent: panelStart }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } }, itemsStart);
      if (numberEls.length) {
        tl.to(numberEls, { duration: 0.6, ease: 'power2.out', '--sm-num-opacity': 1, stagger: { each: 0.08, from: 'start' } }, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(socialLinks, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: { each: 0.08, from: 'start' }, onComplete: () => { gsap.set(socialLinks, { clearProps: 'opacity' }); } }, socialsStart + 0.04);
      }
    }

    this.openTl = tl;
    return tl;
  }

  playOpen(): void {
    if (this.busy) return;
    this.busy = true;
    const tl = this.buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => { this.busy = false; });
      tl.play(0);
    } else {
      this.busy = false;
    }
  }

  playClose(): void {
    this.openTl?.kill();
    this.openTl = null;
    this.itemEntranceTween?.kill();

    const panel = this.panelRef.nativeElement;
    const layers = this.preLayerEls;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    this.closeTween?.kill();
    const offscreen = this.position === 'left' ? -100 : 100;
    this.closeTween = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        this.busy = false;
      }
    });
  }

  animateIcon(opening: boolean): void {
    const icon = this.iconRef.nativeElement;
    if (!icon) return;
    this.spinTween?.kill();
    if (opening) {
      this.spinTween = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      this.spinTween = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }

  animateColor(opening: boolean): void {
    const btn = this.toggleBtnRef.nativeElement;
    if (!btn) return;
    this.colorTween?.kill();
    if (this.changeMenuColorOnOpen) {
      const targetColor = opening ? this.openMenuButtonColor : this.menuButtonColor;
      this.colorTween = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
    } else {
      gsap.set(btn, { color: this.menuButtonColor });
    }
  }

  animateText(opening: boolean): void {
    const inner = this.textInnerRef.nativeElement;
    if (!inner) return;
    this.textCycleAnim?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    this.textLines = seq;

    setTimeout(() => {
      gsap.set(inner, { yPercent: 0 });
      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;
      this.textCycleAnim = gsap.to(inner, { yPercent: -finalShift, duration: 0.5 + lineCount * 0.07, ease: 'power4.out' });
    }, 0);
  }

  toggleMenu(): void {
    const target = !this.open;
    this.open = target;
    
    if (target) {
      this.menuOpen.emit();
      this.playOpen();
    } else {
      this.menuClose.emit();
      this.playClose();
    }
    this.animateIcon(target);
    this.animateColor(target);
    this.animateText(target);
  }

  scrollTo(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }


  onItemClick(sectionId: string): void {
    this.scrollTo(sectionId);
    this.toggleMenu();
  }
}