import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {CrudService} from '../../service/crud.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

export interface GraphModel {
    name: string;
    value: number;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
    public view: Array<any> = [800, 500];
    public graphData: Array<GraphModel> = [];
    // options
    public showXAxis: boolean = true;
    public showYAxis = true;
    public gradient = false;
    public xAxisLabel = 'Month & Year';
    public yAxisLabel = 'Earnings';
    public counts = {
        totalEarnings: 0,
        totalProducts: 0,
        totalCategories: 0,
        totalOrders: 0
    };

    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    single: any[] = [
        {
            'name': 'Germany',
            'value': 8940000
        },
        {
            'name': 'USA',
            'value': 5000000
        },
        {
            'name': 'France',
            'value': 7200000
        },
        {
            'name': 'UK',
            'value': 6200000
        }
    ];
    showLegend: boolean = false;
    showLabels: boolean = false;
    isDoughnut: boolean = false;
    legendPosition: string = 'below';
    public dataInfo = {
        //currencyCode: '',
        currencyName: '',
        currencyCode: '',
    };    // contains current selected currency and language
    constructor(private crud: CrudService, private toastr: ToastrService, public translate: TranslateService,) {
        this.getInfo();
    }

    ngOnInit() {

        this.getGraphData();
    }

    // contains current selected user currency
    private getInfo(): void {
        this.crud.getCurrencyLanguageDataInfo().subscribe((res: any) => {
            if (res.response_code === 200) {
                this.dataInfo = {
                    currencyName: res.response_data.currencyName,
                    currencyCode: res.response_data.currencyCode,
                }
            }
        }, error => {
            this.dataInfo = {
                currencyName: '',
                currencyCode: '',
            }
        });
    }

    // get's graph data
    private getGraphData(): void {
        this.crud.getData('orders/graph').subscribe((res: any) => {
            if (res.response_code !== 200) {
                this.toastr.error('Could not fetch graph information');
            } else {
                let graphData: Array<GraphModel> = [];
                if (res.response_data.graphData) {
                    res.response_data.graphData.barData.datasets[0].data.forEach((val, index) => {
                        graphData.push({name: res.response_data.graphData.barData.labels[index], value: val});
                    });
                }
                this.graphData = graphData;
                this.counts = res.response_data.counts;
            }
        })
    }
}
