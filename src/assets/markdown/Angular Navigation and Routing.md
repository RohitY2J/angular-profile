## Angular Navigation and Routing

Last Modified: June 17, 2024 3:44 PM

##### **Setting Up Routing in Angular:**

Angular uses a built-in router module for handling routing. Here are the steps and code snippets to set up routing for two components in an Angular application:

1. **Create an Angular Project:**
    
    If you don't already have an Angular project, create one using the Angular CLI:
    
    ```bash
    ng new my-angular-app
    ```
    
2. **Generate Components:**
    
    Create two components using the Angular CLI:
    
    ```bash
    ng generate component component1
    ng generate component component2
    ```
    
3. **Configure Routes:**
    
    In the **`app-routing.module.ts`** file, configure the routes for the two components:
    
    ```tsx
    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { Component1Component } from './component1/component1.component';
    import { Component2Component } from './component2/component2.component';
    
    const routes: Routes = [
      { path: 'component1', component: Component1Component },
      { path: 'component2', component: Component2Component },
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
    })
    export class AppRoutingModule {}
    ```
    
4. **Add Router Outlet:**
    
    In the **`app.component.html`** file, add a **`<router-outlet>`** element to display the components:
    
    ```html
    <router-outlet></router-outlet>
    ```
    
5. **Navigate to Components:**
    
    You can use the **`routerLink`** directive to navigate to the components. For example, in the **`app.component.html`**:
    
    ```html
    <a routerLink="/component1">Component 1</a>
    <a routerLink="/component2">Component 2</a>
    ```
    

Now, when you click the links, the corresponding components will be displayed in the **`<router-outlet>`**.

##### **Multiple Router Outlet**

In Angular, you can use multiple `<router-outlet>` elements to render different parts of a page. This is useful when you want to have nested views, sidebars, or multiple content areas that are independently controlled by different router outlets. Here's how you can use multiple router outlets in an Angular application:

1. **Set Up Routes:**
Define your routes in the `app-routing.module.ts` file, and give each route a named outlet.
    
    ```tsx
    const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'sidebar', component: SidebarComponent, outlet: 'sidebar' },
      { path: 'content', component: ContentComponent, outlet: 'content' },
    ];
    
    ```
    
    In this example, we have three routes:
    
    - An empty route for the main content area.
    - A route for the sidebar, which uses the `sidebar` outlet.
    - A route for the content area, which uses the `content` outlet.
2. **Add Router Outlets:**
In your template (e.g., `app.component.html`), add the router outlets where you want the components to be displayed. You can name each outlet using the `name` attribute.
    
    ```html
    <router-outlet></router-outlet> <!-- Main content area -->
    <router-outlet name="sidebar"></router-outlet> <!-- Sidebar -->
    <router-outlet name="content"></router-outlet> <!-- Content area -->
    
    ```
    
3. **Navigate to Named Outlets:**
In your component or template, use the `routerLink` directive to navigate to the named outlets:
    
    ```html
    <a routerLink="/sidebar" routerLinkActive="active" outlet="sidebar">Show Sidebar</a>
    <a routerLink="/content" routerLinkActive="active" outlet="content">Show Content</a>
    
    ```
    
    Here, we specify the `outlet` attribute to indicate which named outlet the link should navigate.
    
4. **Router Outlet Activation:**
When you navigate to a route with a named outlet, Angular will render the corresponding component in the specified router outlet.

With these steps, you can use multiple router outlets to render different parts of a page in an Angular application. This is especially useful for creating complex layouts with distinct sections that can be independently controlled by the router.

##### **Sending data through routing**

There are several ways:

1. **Query Parameters:**
  Query parameters are typically used for sending non-sensitive data in the URL. They are appended to the URL after a `?` and separated by `&` if there are multiple parameters.

    **Example:**

    Navigate with query parameters:

    ```tsx
    import { Router } from '@angular/router';

    constructor(private router: Router) {}

    navigateWithQueryParams() {
      const queryParams = { id: '123', name: 'John Doe' };
      this.router.navigate(['/destination-route'], { queryParams: queryParams });
    }

    ```

    Retrieve query parameters in the destination component:

    ```tsx
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute } from '@angular/router';

    @Component({
      selector: 'app-destination',
      templateUrl: './destination.component.html',
      styleUrls: ['./destination.component.css']
    })
    export class DestinationComponent implements OnInit {

      constructor(private route: ActivatedRoute) { }

      ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          const id = params['id'];
          const name = params['name'];
          console.log('ID:', id);
          console.log('Name:', name);
        });
      }

    }

    ```

2. **Route Parameters**

    Route parameters are used when the data is a part of the route itself. They are specified in the route path and can be accessed in the destination component using `ActivatedRoute`.

    **Example:**

    Navigate with route parameters:

    ```tsx
    import { Router } from '@angular/router';

    constructor(private router: Router) {}

    navigateWithRouteParams() {
      const id = '123';
      this.router.navigate(['/destination-route', id]);
    }

    ```

    Retrieve route parameters in the destination component:

    ```tsx
    import { Component, OnInit } from '@angular/core';
    import { ActivatedRoute, ParamMap } from '@angular/router';

    @Component({
      selector: 'app-destination',
      templateUrl: './destination.component.html',
      styleUrls: ['./destination.component.css']
    })
    export class DestinationComponent implements OnInit {
      id: string;

      constructor(private route: ActivatedRoute) { }

      ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
          this.id = params.get('id');
          console.log('ID:', this.id);
        });
      }

    }

    ```

**Choosing Between Query Parameters and Route Parameters**

- **Query Parameters**: Use when the data is optional, non-sensitive, or when you want to share a link that includes the data.
- **Route Parameters**: Use when the data is required for the route to function correctly, such as an ID to fetch specific data.

**Additional Considerations**

- **Query Parameters Limitation**: Query parameters have a length limit imposed by some browsers (typically around 2,000 characters). If you need to send a large amount of data or sensitive data, consider using a different method such as state management (e.g., Angular services, Redux/NgRx, etc.) or local storage.
- **Encoding**: Ensure that data sent via query parameters is properly encoded to prevent issues with special characters or reserved characters in URLs.