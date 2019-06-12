import Moment from 'moment';

export class Datehelper{
    moment:any;

    
    officeStartHr:number;
    officeStartMin:number;
    officeEndHr:number;
    officeEndMin:number;

    constructor(){

        //initializing todays date and time
        this.moment = Moment();

        //initalizing office timings
        this.officeStartHr=10;
        this.officeStartMin=30;

        this.officeEndHr= 19;
        this.officeEndMin = 30;


    }

    isLate():Boolean{
        if(this.moment.format('hh')<this.officeStartHr)
            return true;
        if(this.moment.format('hh')>this.officeStartHr)
            return false;

        if((this.moment.format('mm')<=this.officeStartMin))
            return true;
        return false;
    }

    fullDateTime():string{
        return this.moment.format();
    }

    fullDate():string{
        return this.moment.format('YYYY-MM-DD');
    }

    lateBy(startTime:Date):number{
        const startHr =  Moment(startTime).format('hh')
        const startMin = Moment(startTime).format('mm');
        const hrDiff = parseInt(startHr) - this.officeStartHr;
        const minDiff = parseInt(startMin) - this.officeStartMin;
        return (hrDiff*60) + minDiff;
    }
    workingTime(startTime:Date,endTime:Date):number{
        const startHr =  Moment(startTime).format('hh')
        const endHr = Moment(endTime).format('hh');
        return parseInt(endHr)-parseInt(startHr);
    }

    noOfWeekDays(startDate:string, endDate:string):number{

        let startDateMoment = Moment(startDate);
        let endDateMoment = Moment(endDate)
        let days = Math.round(startDateMoment.diff(endDateMoment, 'days') - startDateMoment.diff(endDateMoment, 'days') / 7 * 2);
        if (endDateMoment.day() === 6) {
          days--;
        }
        if (startDateMoment.day() === 7) {
          days--;
        }
        return -(days);

    }

    startOfCurrentMonth():string{
        return `${this.moment.format('YYYY-MM-01')}`
    }
    endOfCurrentMonth():string{
        return this.moment.format('YYYY-MM-DD');
    }

    
}