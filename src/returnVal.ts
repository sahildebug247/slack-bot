export default class ReturnVal {
    success: boolean;
    message?: any;
    data: any;
    httpCode?: number;
    constructor(success: boolean, message: string, data: any, httpCode: number){
        this.success = success;
        this.message = message;
        this.data = data;
        if (httpCode)
            this.httpCode = httpCode;
        else {
            this.httpCode =  success ? 200 : 400;
        }
    }

    static success(message?: string, data?: any, httpCode?: number): ReturnVal{
        if (!message)
            message = "Successful";
        if (!data)
            data = {};
        if(!httpCode)
            httpCode=200;
        return new ReturnVal(true, message, data, httpCode);
    }

    static error(message?: string, data?: any, httpCode?: number): ReturnVal{
        if (!message)
            message = "Error Occurred";
        return new ReturnVal(false, message, data, httpCode);
    }

    static unauthorizedAccess(){
        return new ReturnVal(false, "Unauthorized", null, 401);
    }
}