import { Component, OnInit } from '@angular/core';
import { RequestService } from "../services/request.service";
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  request:any = [];

  constructor(private requestService: RequestService, private http: HttpClient) { }

  ngOnInit() {

    this.requestService.getAllPosts(localStorage.getItem('username')).subscribe(post=>{
      console.log(post);
      this.request = post;
      
      
    })
  }

}
