import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../markdown.service';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-angular-introduction',
  templateUrl: './angular-introduction.component.html',
  styleUrls: ['./angular-introduction.component.css']
})
export class AngularIntroductionComponent {
  markdownContent: string = "";
  markdownPath = '../../assets/markdown/';
  markdownFileUrl = '../../assets/markdown/Angular Navigation and Routing.md';
  pdfUrl = "../../assets/pdf/Collections_in_NET.pdf";
  angularTopics: { name: string, fileName: string }[] = [
    { name: 'Angular Routing', fileName: 'Angular Navigation and Routing.md'},
  ];
  //angularTopics: string[] = ['Angular Routing'];
  dotNetTopics: { name: string, fileName: string }[] = [
    { name: 'Collections', fileName: 'Collections in NET.md'},
  ];
  isLoading: boolean = false;

  pdfPath: SafeResourceUrl = '';

  constructor(private http: HttpClient,private sanitizer: DomSanitizer, private markdownService: MarkdownService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.updateMarkDownFile();
    })
  }

  updateMarkDownFile(){
    this.isLoading = true;

    let fileName = this.route.snapshot.queryParamMap.get('file');
    this.markdownFileUrl = this.markdownPath + fileName;
    this.markdownService.getMarkdownContent(this.markdownFileUrl)
      .subscribe((content: string) => {
        this.markdownContent = this.markdownService.parseMarkdown(content);
        this.isLoading = false;
      });
  
  }

  redirectTo(url: string){

  }
}
