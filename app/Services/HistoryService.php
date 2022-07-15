<?php
namespace App\Services;

use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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

    public function getAllOfUser()
    {
        $user_id = Auth::user()->id;
        $histories = Invoice::where("user_id", "=", $user_id)->orderBy('created_at', 'DESC')->get();
        return $histories;
    }

    public function getBestSaleCategory()
    {
        $user_id = Auth::user()->id;
        return Product::join('invoices', 'products.id', '=', 'invoices.product_id')
            ->where("user_id", "=", $user_id)
            ->select('products.*', \DB::raw('SUM(quantity) as quantity'))
            ->groupBy('products.id')
            ->orderBy('quantity', 'desc')
            ->take(1)
            ->get(['category_id']);
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
