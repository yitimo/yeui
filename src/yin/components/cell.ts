import { Directive, Component, HostBinding, Input, ChangeDetectionStrategy, ViewEncapsulation,
OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: 'div[ye-cells]'
})
export class CellsDirective {
    @HostBinding('class.weui-cells') public cellsC: boolean = true;
}

// tslint:disable-next-line:max-classes-per-file
@Component({
    selector: 'ye-cell',
    template: `
        <div class="weui-cell__hd">
            <ng-content select="[head]"></ng-content>
        </div>
        <div class="weui-cell__bd">
            <ng-content select="[body]"></ng-content>
        </div>
        <div class="weui-cell__ft">
            <ng-content select="[foot]"></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent implements OnChanges {
    @HostBinding('class.weui-cell') public cellC: boolean = true;
    @HostBinding('class.weui-cell_warn') public warnC: boolean = false;
    @Input() public warn: boolean;
    public ngOnChanges(changes: SimpleChanges) {
        if (changes.warn && changes.warn.currentValue !== changes.warn.previousValue) {
            this.warnC = changes.warn.currentValue !== false;
        }
    }
}
