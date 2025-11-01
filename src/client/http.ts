import * as axios from 'axios';
import { ENDPOINTS, Endpoints } from '../constants/endpoints';
import { APIResponse, Error } from '../types/APIResponse';
import { LawParam } from '../types/LawParam';
import { LawId, LawNum, RevisionId } from '../types/lawId';


/**
 * Represents an HTTP client for making requests to a specified base URL.
 */
export class HttpClient {

    constructor(
        private responseType: "json" | "xml" = "json",
        private baseURL: string = "https://laws.e-gov.go.jp/api/2" 
    ) {}

    public async get<T>( endpoint : "LAWS" | "KEYWORD", param: LawParam ) : Promise<APIResponse<T>>
    public async get<T>( endpoint : "LAWREVISIONS" | "LAWDATA", param: LawParam, lawArg: LawId | LawNum ) : Promise<APIResponse<T>>
    public async get<T>( endpoint : "ATTACHMENT", param: LawParam, lawArg: RevisionId ) : Promise<APIResponse<T>>
    public async get<T>( endpoint : "LAWFILE", param: LawParam, lawArg: string, fileType: string  ) : Promise<APIResponse<T>>
    public async get<T>( endpoint : Endpoints, param: LawParam, lawArg?: string, fileType?: string ) : Promise<APIResponse<T>>{

        const apiEndpoint = ( endpoint : Endpoints, lawArg?: LawId | LawNum | RevisionId, fileType?: string ) => {
            const ep = ENDPOINTS[ endpoint ] as string | Function;
            switch( endpoint ) {
                case "LAWS":
                case "KEYWORD":
                    return ep;
                case "LAWREVISIONS":
                    if ( typeof ep === "function" ) {
                        return ep( lawArg as LawId | LawNum );
                    }
                break;
                case "LAWDATA":
                    if ( typeof ep === "function" ) {
                        return ep( lawArg as LawId | LawNum | RevisionId );
                    }
                break;
                case "ATTACHMENT":
                    if ( typeof ep === "function" ) {
                        return ep( lawArg as RevisionId );
                    }
                break;
                case "LAWFILE":
                    if ( typeof ep === "function" && fileType ) {
                        return ep( lawArg as LawId | LawNum | RevisionId, fileType );
                    }
                break;
                default:
                    throw new Error(`Invalid endpoint or missing parameters for endpoint: ${endpoint}`);
            }
        }

        const response = await axios.default.get<T>( this.baseURL + apiEndpoint( endpoint, lawArg, fileType ), {
            headers: {
                "Content-Type": "application/json",
                // "content-type": this.responseType === "json" ? "application/json" : "application/xml"
            },
            params: param,
            // responseType: this.responseType === "json" ? "json" : "text"
        } );
        if( response.status !== 200 ){
            return Promise.resolve(response.data as Error);
        }
        return Promise.resolve(response.data as T);
    }
}