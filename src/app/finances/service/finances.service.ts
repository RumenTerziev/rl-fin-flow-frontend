import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { Converted } from "../../model/converted.model";
import { Convert } from "../../model/convert.model";
import { PageResult } from "../../model/page-result.model";

@Injectable()
export class FinancesService {

    pageResult = new BehaviorSubject<PageResult>(null);

    constructor(private http: HttpClient) { }

    fetchConversionsHistory(page: number) {
        const conversionsUrl = `/api/v1/finances/my-conversions?page=${page}`;
        return this.http.get(conversionsUrl)
            .pipe(
                map((response: PageResult) => {
                    const pageResult = response;
                    this.pageResult.next(pageResult);
                    return pageResult;
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
                        resultSum: response.resultSum,
                        currencyRate: response.currencyRate
                    };
                    return converted;
                })
            );
    }
}