### Angular Components

##### **Angular Architecture**

<div class="w-500">

![Untitled](/assets/img/Angular%20Components/Untitled.png)

</div>

Templates combines Html with angular derivatives.</br>
Components defines many views in hierarchical order.</br>
Router services provides navigation around application.</br>
Angular apps are modular and has its own  modularity system called Angular modules or `NgModules`.

##### **Module vs Components**
Components divide the UI into smaller parts. When we need to get a divided and clear view of UI in angular, components are used.

Module is a big container containing small containers like components, service and files.
Components controls patch-up screen called views. i.e. small portion joined into big UI 

Modules do not control any Html while components can control the HTML.
Decorator used for module is `@ngmodule` whereas for component is `@component`

##### **Components**

Components contain following elements:

Html (template)</br>
Typescript class (code)</br>
Metadata (CSS selector)</br>

Templates are form of `Html` that are used in creation of component.

##### **Benefits of components**

1. In-browser Navigation → components are rendered from router services and thus can be used for in-browser navigation.
2. Browser independent.


##### **Creation of Components**

Command for creating component is 

```jsx
ng g c component_name //eg: ng g c demo
g = generate
c = component
```

<div>

![Untitled](/assets/img/Angular%20Components/Untitled%201.png)

</div>

As we can see, the `app component` file contains html, CSS and typescript file as mentioned in the tree structure of component. 
`app.component.spec.ts` is created for testing purpose.



<div class="h-350">

![Untitled](/assets/img/Angular%20Components/Untitled%202.png)

</div>

In the index.html, we can see the section where the `<app-root>` component is being rendered. The component is selected on the basis of selector present in the component `typesscript(.ts)` file. 


<div class="h-350">

![Untitled](/assets/img/Angular%20Components/Untitled%203.png)

</div>

As we can see the typescript has selector value set to `app-root` thus in the index.html, the app-root component is replaced by `appcomponent`.
Also we can see that component is defined using `@Component` decorator as mentioned before.


**Selector**

Now to render the demo-component, we need to add the selector tag for demo component in the html files where needed.

![defining the component](/assets/img/Angular%20Components/Untitled%206.png)

defining the component

![using the component](/assets/img/Angular%20Components/Untitled%207.png)

using the component

The component selector can be defined and used in the different ways as well

```jsx
selector : '.app-demo' //definition as class rather than tag
<div class = "app-demo"> //use

selector : '[app-demo]' //definition as attribute
<div app-demo></div> //use
```

**Template**

In the above example, file is provided for `templateurl`. But we can also use inline html for template purpose.
The inline html can be used as:

```jsx
template : `<div>Sample html</div>`
```

**StyleUrls**

Styleurls can also be provided with inline styles as:

```jsx
style: [`div{color: red;}`]
```

##### **How to pass parameter into the child component?**

1. **Define an Input Property in the Child Component**:
    
    In the child component where you want to receive the data, you need to define an input property using the `@Input` decorator. This property will be bound to the data passed from the parent component.
    
    ```tsx
    import { Component, Input } from '@angular/core';
    
    @Component({
      selector: 'app-child',
      template: `
        <div>
          <h2>Child Component</h2>
          <p>Data from Parent: {{ dataFromParent }}</p>
        </div>
      `
    })
    export class ChildComponent {
      @Input() dataFromParent: string;
    }
    
    ```
    
2. **Pass Data from the Parent Component**:
    
    In the parent component's template, where you use the child component, you can bind the input property using square brackets `[]` with the property name. The value you provide will be passed to the child component.
    
    ```tsx
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-parent',
      template: `
        <div>
          <h1>Parent Component</h1>
          <app-child [dataFromParent]="dataToChild"></app-child>
        </div>
      `
    })
    export class ParentComponent {
      dataToChild: string = 'Hello from Parent!';
    }
    ```
    

In this example, the `dataToChild` property in the parent component is bound to the `dataFromParent` input property in the child component. The data from the parent component is passed to the child component, and you can use it within the child component's template.

##### **How to pass parameter from child to parent component?**

In Angular, you can pass data from a child component to a parent component using `@Output` and custom events. Here's a step-by-step guide on how to return a parameter from a child component to a parent component:

1. **Create the Child Component**:
Start by creating the child component that will send data back to the parent. You can generate a new component using the Angular CLI with the following command:
    
    ```
    ng generate component child
    ```
    
    In the child component TypeScript file (`child.component.ts`), import `EventEmitter` and `Output` from `@angular/core`. Then, define an `@Output` property to emit an event with the data you want to pass to the parent component. Here's an example:
    
    ```tsx
    import { Component, EventEmitter, Output } from '@angular/core';
    
    @Component({
      selector: 'app-child',
      templateUrl: './child.component.html',
      styleUrls: ['./child.component.css']
    })
    export class ChildComponent {
      @Output() dataEvent = new EventEmitter<string>();
    
      sendDataToParent(data: string) {
        this.dataEvent.emit(data);
      }
    }
    ```
    
2. **Use the Child Component in the Parent Component**:
In the parent component's template, use the child component and bind to the event emitted by the child. Make sure to include an event handler in the parent component to receive the data. For example:
    
    ```html
    <app-child (dataEvent)="handleDataFromChild($event)"></app-child>
    <p>Data from child: {{ dataFromChild }}</p>
    
    ```
    
3. **Handle the Event in the Parent Component**:
In the parent component TypeScript file, implement the event handler `handleDataFromChild(data)` to receive the data sent by the child component. Update the property in the parent component to store the received data:
    
    ```tsx
    import { Component } from '@angular/core';
    
    @Component({
      selector: 'app-parent',
      templateUrl: './parent.component.html',
      styleUrls: ['./parent.component.css']
    })
    export class ParentComponent {
      dataFromChild: string = '';
    
      handleDataFromChild(data: string) {
        this.dataFromChild = data;
      }
    }
    ```
    
4. **Emit Data from the Child Component**:
To send data from the child component to the parent, call the `sendDataToParent` method in the child component's logic:
    
    ```tsx
    sendDataToParent() {
      const dataToSend = 'Data from child component';
      this.dataEvent.emit(dataToSend);
    }
    ```
    

Now, when you trigger the `sendDataToParent` method in the child component, it will emit the `dataEvent`, and the parent component's `handleDataFromChild` method will receive the data and update the `dataFromChild` property. The updated data will be displayed in the parent component's template.