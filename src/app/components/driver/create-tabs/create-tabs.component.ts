import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-tabs',
  templateUrl: './create-tabs.component.html',
  styleUrls: ['./create-tabs.component.css']
})
export class CreateTabsComponent {
  selectedTab: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedTab = params['tab'];
    });
  }
}