 # perform-ecs  [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)
 
 
Perform-ecs is [the fastest](https://github.com/fireveined/ecs-benchmark-js) TypeScript based Component-Entity-System framework. It was originally written for [Open Stronghold](https://github.com/fireveined/open-stronghold) - open source clone of Stronghold/Stronghold Crusader engine.

## Why Entity Component System?

ECS is an architectural pattern used mostly in game development. An ECS follows the Composition over Inheritance principle to allow for greater flexibility when defining entities by building out of individual parts that can be mixed-and-matched. This eliminates the ambiguity problems of long inheritance chains and promotes clean design. 

You can read more here [Evolve your hierarchy](http://cowboyprogramming.com/2007/01/05/evolve-your-heirachy/) or here [Entity Systems Wiki](http://entity-systems.wikidot.com/)

## Features
- Swift and efficient. The main principle is 'pay for what you use', so iterating over entities is really fast and you pay only when remove/add entities/components.
- Easy to use API
- Full TypeScript support when composing entities from components
<img src="http://open-stronghold.com/wp-content/ecs_Screen.png" alt="TypeScript Support Screen" width="500"/>

## Install

`npm install perform-ecs --save`

TS types inside.

## Example
```typescript
// create component
@makeComponent
export class TestPositionComponent extends Component {

    public x: number;
    public y: number;

    // this method will be called on every entity
    // parameters after the first one can be used for passing some data when creating entity
    public reset(obj: this, multipler: number = 1): void {
        obj.x = 10 * multipler;
        obj.y = 5 * multipler;
    }
}

// create system
export class TestPositionSystem extends System {

    // create view which will contain all entities that have 'TestPositionComponent'
    // types are fully supported here!
    public view = EntityViewFactory.createView({
        components: [TestPositionComponent],
        onEntityAdded: this.onEntityAdded.bind(this),
        onEntityRemoved: this.onEntityRemoved.bind(this),
    });

    public onEntityAdded(entity: SystemEntityType<this, "view">): void {
    }

    public onEntityRemoved(entity: SystemEntityType<this, "view">): void {
    }
    
    public update(delta: number): void {
      for(const entity of this.view.entities) {
          // do something
       }
    }
}

// prepare
const ecs = new ECS();
const positionSystem = new TestPositionSystem();
ecs.registerSystem(positionSystem);

// create entity
const entity = ecs.createEntity([
          {component: TestPositionComponent}]);
   
// create entity with arguments    
const entity2 = ecs.createEntity([
          {component: TestPositionComponent, args: [2]}]);   
          
assert(entity.x === 10);
assert(entity.y === 5);
assert(entity2.x === 20);
assert(entity2.y === 10);


// you have to calculate delta on your own - there is no default implementation 
let delta = 0.01;

// system 'update' methods will be called
ecs.update(delta);
```

## Docs
Coming soon

## ToDo

- [ ] Documentation
- [ ] Benchmarks
- [ ] More valuable tests
- [ ] Check support for vanilla JS
- [ ] Clean codebase
- [ ] Multiple system views types, suitable for different cases, eg. when entities are removed/added very often.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details
