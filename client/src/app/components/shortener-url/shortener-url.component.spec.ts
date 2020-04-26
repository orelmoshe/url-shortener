import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { shortenerUrlComponent } from "./shortener-url.component";

describe("AddComponent", () => {
  let component: shortenerUrlComponent;
  let fixture: ComponentFixture<shortenerUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [shortenerUrlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(shortenerUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
