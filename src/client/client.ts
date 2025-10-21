import { ENDPOINTS } from "../constants/endpoints";
import { isError } from "../types/APIResponse";
import { IRawLawResponse } from "../types/base/RawLawResponse";
import { ILawResponse } from "../types/ILawResponse";
import { LawResponseImpl } from "../types/impl/LawResponseImpl";
import { LawParam } from "../types/LawParam";
import { HttpClient } from "./http";



export class Client {

    private httpClient: HttpClient;
    constructor( private responseType: "json" | "xml" = "json" ) {
        this.httpClient = new HttpClient( this.responseType );
    }

    public async getLaw( param : LawParam ){
        const response = await this.httpClient.get<IRawLawResponse>( "LAWS" , param );
        if( isError( response ) ){
            return response;
        }
        return new LawResponseImpl(response);
    }

}