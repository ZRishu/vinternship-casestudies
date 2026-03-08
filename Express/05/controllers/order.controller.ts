import { JsonController, Get, Post, Param, Body } from "routing-controllers";
import { type Order } from "../models/order";

// Creating a Safe Place for Orders
const orders: Order[] = [
  { id: "1", customerName: "Maria", flavor: "vanilla", quantity: 2, pickupDate: "2024-07-10" },
];

@JsonController("/orders")
export class OrderController {
  @Get("/")
  getAll() {
    return orders;
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    const order = orders.find(o => o.id === id);
    if (!order) {
      return { status: "error", error: "Order not found" };
    }
    return { status: "success", data: order };
  }

  @Post("/")
  create(@Body() order: Omit<Order, "id">) {
    const newOrder: Order = {
      ...order,
      id: (orders.length + 1).toString(),
    };
    orders.push(newOrder);
    return { status: "success", data: newOrder };
  }
}