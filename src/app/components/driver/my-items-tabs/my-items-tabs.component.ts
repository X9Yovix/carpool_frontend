import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-items-tabs',
  templateUrl: './my-items-tabs.component.html',
  styleUrls: ['./my-items-tabs.component.css']
})
export class MyItemsTabsComponent {
  selectedTab: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedTab = params['tab'];
    });
  }
}
