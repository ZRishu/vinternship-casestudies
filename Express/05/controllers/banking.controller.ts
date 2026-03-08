import { JsonController, Get, Post, Param, Body } from "routing-controllers";

// A simple digital tracker for the baking station
const bakingStatuses: Record<string, string> = {};

@JsonController("/baking")
export class BakingController {
  
  // Endpoint to start baking an order
  @Post("/start")
  startBaking(@Body() requestData: { orderId: string }) {
    const { orderId } = requestData;
    
    // Update the tracker to show this order is currently in the oven
    bakingStatuses[orderId] = "In the oven";
    
    return { 
      status: "success", 
      message: `Baking process started for order #${orderId}.` 
    };
  }

  // Endpoint to check the baking status of an order
  @Get("/status/:id")
  checkStatus(@Param("id") id: string) {
    // Check our tracker, default to "Not started" if it's not found
    const currentStatus = bakingStatuses[id] || "Not started";
    
    return { 
      status: "success", 
      data: { 
        orderId: id, 
        status: currentStatus 
      } 
    };
  }
}