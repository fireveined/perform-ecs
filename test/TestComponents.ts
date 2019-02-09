import { Component, makeComponent } from "../src/Component";


@makeComponent
export class TestPositionComponent extends Component {

    public x: number;
    public y: number;

    public reset(obj: this): void {
        obj.x = 10;
        obj.y = 20;
    }
}

@makeComponent
export class TestVelocityComponent extends Component {

    public dx: number;
    public dy: number;

    public reset(obj: this, multi: number = 1): void {
        obj.dx = 10 * multi;
        obj.dy = 20 * multi;
    }

}