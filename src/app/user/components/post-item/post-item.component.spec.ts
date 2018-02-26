import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { PostItemComponent } from "./post-item.component";
import DataMockUsers from "../../../../../mock/mock-data/mock-users";
import DataMockPosts from "../../../../../mock/mock-data/mock-posts";

describe("PostItemComponent", () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatCardModule, MatIconModule],
        declarations: [PostItemComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    component.post = DataMockPosts[0];
    component.user = DataMockUsers[0];
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
