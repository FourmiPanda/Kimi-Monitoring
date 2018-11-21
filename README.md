<p align="center">
  <h1 align="center">Kimi Monitoring</h1>
  <p align="center">The official library for Kimi Monitoring</p>
</p>


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.


## What is Kimi Monitoring?

- **Access to Firebase** - Use the power of AngularFire2.
- **Clean API** - Easily understandable.
- **Modular** - Just add the service you want to use.


### Quick links

**About angularFire2** - Get information about [angularFire2](https://github.com/angular/angularfire2)

## Useful information

In order to use the service you have to ___authenticate yourself___.
I've implemented a basic authentication system.
You can use your **Google**, **Facebook** or **Twitter** account to do so.

# Developer Guide

## Getting started

Create a component in the src/app/ folder.
The GetDataService is provided in root. In order to
use it, just add an attribute with the type GetDataService to your component's constructor.

To configure this application for your Firebase database. You can
modify the `Kimi-Monitoring\src\environments\environment.ts` file.

To use the service call a method on the getDataService attribute.

### Example:
```typescript
import {GetDataService} from '../../services/get-data.service';

export class DashboardComponent {
  //Add an attribute (getDataService) to your component
  constructor(private getDataService: GetDataService) {}
  
  someFunction(){
    //Call a getDataService method
    this.getDataService.someMethod();
  }
}
```

**More Example** : The DashBoardComponent and the UserComponent are example on how to use the different services.

## Useful command
### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


Feel free to use, reuse, extend, and contribute
