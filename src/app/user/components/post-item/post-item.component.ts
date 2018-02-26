import { Component, OnInit, Input } from "@angular/core";
import { User } from "../../../core/models/user.models";
import { Post } from "../../../core/models/post.models";

@Component({
  selector: "temp-post-item",
  templateUrl: "./post-item.component.html",
  styleUrls: ["./post-item.component.scss"]
})
export class PostItemComponent implements OnInit {
  @Input() post: Post;
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
