import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-count-up',
  standalone: true,
  imports: [],
  templateUrl: './count-up.html',
  styleUrls: ['./count-up.css']
})
export class CountUpComponent implements AfterViewInit, OnDestroy {
 // O número que ele deve começar
  @Input() from: number = 0; 
  // Quanto ele deve aumentar a cada vez
  @Input() increment: number = 1;
  // A cada quantos milissegundos ele deve aumentar (ex: 3000 = 3 segundos)
  @Input() intervalMs: number = 3000; 
  // O separador de milhar (ex: ".")
  @Input() separator: string = '';
  @Input() className: string = '';

  @ViewChild('countUpRef') ref!: ElementRef<HTMLSpanElement>;

  private currentValue: number = 0;
  private intervalId: any = null;

  ngAfterViewInit(): void {
    this.currentValue = this.from;
    this.ref.nativeElement.textContent = this.formatValue(this.currentValue);
    this.startCounting();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCounting(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      this.currentValue += this.increment;
      this.ref.nativeElement.textContent = this.formatValue(this.currentValue);
    }, this.intervalMs);
  }

  private formatValue(latest: number): string {
    const options: Intl.NumberFormatOptions = {
      useGrouping: !!this.separator,
    };

    const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

    return this.separator ? formattedNumber.replace(/,/g, this.separator) : formattedNumber;
  }
}
