// implement PromotionSystem observer
interface Observer { update(msg: string): void; }
class PromotionSystem implements Observer{update(msg: string): void {
    console.log(`Promotional message: ${msg}`)
}}

class DrinkOrder {
  private observers: Observer[] = [];
  addObserver(obs: Observer) { this.observers.push(obs); }
  notifyAll(msg: string) { this.observers.forEach(obs => obs.update(msg)); }
  completeOrder() { this.notifyAll("Order complete!"); }
}

// testing notification by adding PromotionalSystem to DrinkOrder notification list
const order = new DrinkOrder();
order.addObserver(new PromotionSystem());
order.notifyAll("75% off for every new customer!")


