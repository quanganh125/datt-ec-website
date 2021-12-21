<?php
namespace App\Services;

use App\Models\Invoice;
class HistoryService
{
    public function get($id)
    {
        $history = Invoice::find($id);
        return $history;
    }

    public function getAll()
    {
        return Invoice::all();
    }

    public function update($id, array $history_data)
    {
        $history = Invoice::findOrFail($id);
        $history->fill($history_data)->save();
        return $history;
    }

    public function delete($id)
    {
        $history = Invoice::destroy($id);
        return response()->json($id);
    }

}
