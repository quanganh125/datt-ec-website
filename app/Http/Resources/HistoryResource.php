<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HistoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'price_at_purchase_time' => $this->price_at_purchase_time,
            'discount_at_purchase_time' => $this->discount_at_purchase_time,
            'user_id' => $this->user_id,
            'customer_name' => $this->user->name,
            'product_name' => $this->product->name,
            'product_id' => $this->product->id,
            'category' => $this->product->category->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
