import { assert } from "chai"
import { ECS } from "../src/ECS";
import { TestEmptyComponent, TestPositionComponent, TestVelocityComponent } from "./TestComponents";
import { TestPositionSystem, TestVelocitySystem } from "./TestSystems";
import { componentHashHasComponent, componentHashMatch, getComponentsHash } from "../src/ComponentGroupHash";

describe('Component hash', function () {

    const ecs = new ECS();
    const positionSystem = new TestPositionSystem();
    const velocitySystem = new TestVelocitySystem();
    ecs.registerSystem(positionSystem);
    ecs.registerSystem(velocitySystem);

    it("can by compared to single components", () => {
        const hashOfTwo = getComponentsHash([TestPositionComponent, TestVelocityComponent])
        assert(componentHashHasComponent(hashOfTwo, TestVelocityComponent))
        assert(componentHashHasComponent(hashOfTwo, TestPositionComponent))
        assert(!componentHashHasComponent(hashOfTwo, TestEmptyComponent))
    });


    it("can be matched against many components", () => {
        const comps: any[] = [];
        for (let i = 0; i < 10; i++) {
            comps.push({id: i});
        }
        const hash012345 = getComponentsHash(comps.slice(0, 5));
        const hash0123 = getComponentsHash(comps.slice(0, 3));
        const hash456 = getComponentsHash(comps.slice(4, 4+3));
        const hash789 = getComponentsHash(comps.slice(7, 7+3));
        const hash89 = getComponentsHash(comps.slice(8, 8+2));
        assert(componentHashMatch(hash012345, hash0123));
        assert(!componentHashMatch(hash012345, hash89));
        assert(!componentHashMatch(hash012345, hash456));
        assert(componentHashMatch(hash789, hash89));
    });
});
