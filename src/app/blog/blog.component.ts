import { Component, OnInit } from '@angular/core';
import { MarkdownService } from '../markdown.service';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class AngularIntroductionComponent {
  markdownContent: string = "";
  markdownPath = '../../assets/markdown/';
  markdownFileUrl = '../../assets/markdown/Angular Navigation and Routing.md';
  pdfUrl = "../../assets/pdf/Collections_in_NET.pdf";
  angularTopics: { mainTopic: string, subTopics: {name: string, fileName: string }[], fName?: string}[] = [
    {
      mainTopic: 'Angular Components', subTopics:[], fName:'Angular Components.md'
    },
    { mainTopic: 'Angular Routing', subTopics: 
      [
        {name: "Introduction", fileName: 'Angular Navigation and Routing.md'}
      ]
    },
  ];
  nodeTopics: { mainTopic: string, subTopics: {name: string, fileName: string }[], fName?:string}[] = [
    {mainTopic: "Introduction", subTopics: [], fName: "Relation Between Node, Js, Ecmascript, Js engine.md"},
    { mainTopic: 'Authentication', subTopics: 
      [
        {name: "Using Passport", fileName: 'Authentication with passport.md'}
      ]
    },
  ];
  dotNetTopics: { mainTopic: string, subTopics: {name: string, fileName: string }[]}[] = [
    { mainTopic: 'Collections', subTopics: 
      [
        {name: "Introduction", fileName: 'Collections in NET.md'}
      ]
    },
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
