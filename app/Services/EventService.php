<?php
namespace App\Services;

use App\Models\Event;

class EventService
{
    public function get($id)
    {
        $event = Event::find($id);
        return $event;
    }

    public function getAll()
    {
        return Event::all();
    }

    public function update($id, array $event_data)
    {
        $event = Event::findOrFail($id);
        $event->fill($event_data)->save();
        return $event;
    }

    public function delete($event_id)
    {
        $event = Coupon::destroy($event_id);
        return response()->json($event_id);
    }
}
