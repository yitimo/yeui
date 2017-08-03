import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    // tslint:disable-next-line:pipe-naming
    name: 'ytmTime'
})

export class TimePipe implements PipeTransform {
    public transform(value: number): any {
        const total = value || 0;
        const min = Math.floor(total / 60);
        const sec = Math.floor(total % 60);
        return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
    }
}
