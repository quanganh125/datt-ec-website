<?php
namespace App\Services;

use App\Models\Category;

class CategoryService
{
    /**
     * Get's a Category by it's ID
     *
     * @param int
     * @return collection
     */
    public function get($id)
    {
        return Category::find($id);
    }

    /**
     * Get's all Categorys.
     *
     * @return mixed
     */
    public function getAll()
    {
        return Category::all();
    }

    public function update($id, array $category_data)
    {
        $category = Category::findOrFail($id);
        $category->fill($category_data)->save();
        return $category;
    }

    /**
     * Deletes a Category.
     *
     * @param int
     */
    public function delete($id)
    {
        $category = Category::destroy($id);
        return response()->json($id);
    }
}
