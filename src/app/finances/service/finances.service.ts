import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Converted } from "../../model/converted.model";
import { Convert } from "../../model/convert.model";

@Injectable()
export class FinancesService {

    constructor(private http: HttpClient) { }

    fetchConversionsHistory() {
        const conversionsUrl = '/api/v1/finances/my-conversions';
        return this.http.get(conversionsUrl)
            .pipe(
                map((response: Converted[]) => {
                    const conversions = response;
                    return conversions;
                })
            );
    }

    convertCurrency(baseCurrency: string, currencyToConvertTo: string, sumToConvert: number) {
        const url = '/api/v1/finances/converter';

        const convertRequest: Convert = {
            baseCurrency: baseCurrency,
            currencyToConvertTo: currencyToConvertTo,
            sumToConvert: sumToConvert
        };

        return this.http.post(url, convertRequest)
            .pipe(
                map((response: Converted) => {
                    const converted = {
                        baseCurrency: response.baseCurrency,
                        currencyToConvertTo: response.currencyToConvertTo,
                        sumToConvert: response.sumToConvert,
                        resultSum: response.resultSum
                    };
                    return converted;
                })
            );
    }
}