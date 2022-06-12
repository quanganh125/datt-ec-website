<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EventService;
use App\Models\Event;
use App\Http\Resources\EventCollection;
use App\Http\Resources\EventResource;

class EventController extends Controller
{
    protected $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events = $this->eventService->getAll();
        return (new EventCollection($events))->response();
    }

    public function eventCurrent(){
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = new Event();
        $event->id = $request->input('id');
        $event->id = $request->input('name');
        $event->id = $request->input('banner_url');
        $event->id = $request->input('icon_url');
        $event->id = $request->input('description');
        $event->id = $request->input('start_time');
        $event->id = $request->input('end_time');
        $event->save();
        return (new CouponResource($event))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = $this->eventService->get($id);
        return (new EventResource($event))->response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id){
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $event = $this->eventService->update($id, $input);
        return (new EventResource($event))->response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->eventService->delete($id);
    }
}
