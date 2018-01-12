import { Directive, Component, HostBinding, Input, ChangeDetectionStrategy, ViewEncapsulation,
OnChanges, SimpleChanges, ContentChild, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
// tslint:disable:max-classes-per-file
/**
 * <div ye-cells>
 *  <div cell>
 *    <div head>...</div>
 *    <div body>...</div>
 *    <div foot>...</div>
 *  </div>
 * </div>
 */
@Directive({
    selector: 'div[head]'
})
export class CellHdDirective {
    @HostBinding('class.weui-cell__hd') public cellC: boolean = false;
}

@Directive({
    selector: 'div[body]'
})
export class CellBdDirective {
    @HostBinding('class.weui-cell__bd') public cellC: boolean = false;
}

@Directive({
    selector: 'div[foot]'
})
export class CellFtDirective {
    @HostBinding('class.weui-cell__ft') public cellC: boolean = false;
}

@Directive({
    selector: 'div[cell]'
})
export class CellDirective implements AfterContentInit {
    @HostBinding('class.weui-cell') public cellC: boolean = false;
    @HostBinding('class.weui-cell_warn') public warnC: boolean = false;
    @HostBinding('class.weui-cell_vcode') public vcodeC: boolean = false;
    @HostBinding('class.weui-cell_access') public accessC: boolean = false;
    @Input() public set warn(warn: any) {
        this.warnC = warn !== false;
    };
    @Input() public set vcode(vcode: any) {
        this.vcodeC = vcode !== false;
    };
    @Input() public set access(access: any) {
        this.accessC = access !== false;
    };
    @ContentChildren(CellHdDirective) public headD: QueryList<CellHdDirective>;
    @ContentChildren(CellBdDirective) public bodyD: QueryList<CellBdDirective>;
    @ContentChildren(CellFtDirective) public footD: QueryList<CellFtDirective>;
    public ngAfterContentInit() {
        // only when sub directives in cell can the right class be setted
        this.headD.forEach((c) => {
            c.cellC = true;
        });
        this.bodyD.forEach((c) => {
            c.cellC = true;
        });
        this.footD.forEach((c) => {
            c.cellC = true;
        });
    }
}

@Directive({
    selector: 'div[ye-cells]'
})
export class CellsDirective implements AfterContentInit {
    @HostBinding('class.weui-cells') public cellsC: boolean = true;
    @ContentChildren(CellDirective) public cellD: QueryList<CellDirective>;
    @HostBinding('class.weui-cells_checkbox') public checkboxC: boolean = false;
    @Input() public set checkbox(checkbox: any) {
        this.checkboxC = checkbox !== false;
    };
    public ngAfterContentInit() {
        // only when sub directives in ye-cells can the right class be setted
        this.cellD.forEach((c) => {
            c.cellC = true;
        });
    }
}
