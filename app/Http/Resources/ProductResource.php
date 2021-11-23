<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'category_id' => $this->category_id,
            'image_link' => $this->image_link,
            'price' => $this->price,
            'description' => $this->description,
            'recommend_mark' => $this->recommend_mark,
            'shop_id' => $this->shop_id, 
            'reviews' => $this->reviews,
        ];
    }
}
