class TransducerError extends Error {}
class Transducer{
    //To solve "No index signature with a parameter of type 'string' was found on type"
    [key:string]:any;
    output:Array<string>;
    input:string;
    cur_state:string;
    constructor(input:string,start_state:string){
        this.output = []
        this.input=input
        this.cur_state = start_state
    }
    run():Array<any>{
        for(const symbol of this.input){
            const method:Function = this['state_'+this.cur_state];
            if (typeof method !== 'function') {
                throw new TransducerError(`No method handler found for state ${this.cur_state}`);
            }
            method.call(this, symbol);
        }
        return this.output
    }

    transition(new_state:string) {
        let handler = this[`action_${this.cur_state}_exit`];
        if (typeof handler === 'function') {
            handler();
        }

        handler = this[`action_transition`];
        if (typeof handler === 'function') {
            handler.call(this, this.cur_state, new_state);
        }

        handler = this[`action_${new_state}_enter`];
        if (typeof handler === 'function') {
            handler();
        }

        this.cur_state = new_state;
    }
}
export {Transducer}