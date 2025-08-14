import React from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";

export default function CategorizeEditor({ index, data, onChange, addQuestion, removeQuestion }) {
  // data: { description, categories, items, points }
  const description = data.description ?? "";
  const categories = data.categories ?? [];
  const items = data.items ?? [];
  const points = data.points ?? 0;

  const setData = (patch) => onChange({ ...data, ...patch });

  const addCategory = () => setData({ categories: [...categories, `Category ${categories.length + 1}`] });
  const deleteCategory = (i) => {
    const nextCats = categories.filter((_, idx) => idx !== i);
    // ensure items have valid belongsTo
    const nextItems = items.map(it => ({
      ...it,
      belongsTo: nextCats.includes(it.belongsTo) ? it.belongsTo : nextCats[0] ?? ""
    }));
    setData({ categories: nextCats, items: nextItems });
  };
  const updateCategory = (i, v) => {
    const next = [...categories]; next[i] = v;
    setData({ categories: next });
  };

  const addItem = () => setData({ items: [...items, { name: "", belongsTo: categories[0] ?? "" }] });
  const updateItem = (i, patch) => {
    const next = [...items]; next[i] = { ...next[i], ...patch }; setData({ items: next });
  };
  const removeItem = (i) => setData({ items: items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6 p-6 border rounded-2xl bg-white shadow-lg relative">
      <div className="absolute right-3 top-3 flex flex-col gap-2 items-center">
        <a href="https://help.socratease.co/lms/what-is-categorize-and-how-to-create-it" target="_blank" rel="noopener noreferrer" className="text-pink-500">
          <HelpCircle size={20} />
        </a>
        <input value={points} onChange={(e) => setData({ points: Number(e.target.value) })} type="number" className="w-16 border rounded px-1 text-sm" />
        <button onClick={addQuestion} className="p-1 rounded hover:bg-gray-100"><Plus size={18} /></button>
        <button onClick={() => removeQuestion(index)} className="p-1 rounded hover:bg-red-100 text-red-500"><Trash2 size={18} /></button>
      </div>

      <h2 className="text-lg font-semibold">Question {index + 1}</h2>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Description</label>
        <input value={description} onChange={(e) => setData({ description: e.target.value })} className="w-full border rounded px-3 py-2" />
      </div>

      <div>
        <h3 className="font-medium mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat, i) => (
            <div key={i} className="flex gap-2">
              <input value={cat} onChange={(e) => updateCategory(i, e.target.value)} className="flex-1 border rounded px-3 py-2" />
              <button onClick={() => deleteCategory(i)} className="px-3 rounded border text-red-600">✕</button>
            </div>
          ))}
        </div>
        <button onClick={addCategory} className="mt-2 rounded bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-colors duration-200">+ Add Category</button>
      </div>

      <div>
        <h3 className="font-medium mb-2">Items</h3>
        <div className="space-y-2">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={it.name} onChange={(e) => updateItem(i, { name: e.target.value })} className="flex-1 border rounded px-3 py-2" placeholder={`Item ${i + 1}`} />
              <select value={it.belongsTo} onChange={(e) => updateItem(i, { belongsTo: e.target.value })} className="border rounded px-3 py-2">
                {categories.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
              </select>
              <button onClick={() => removeItem(i)} className="px-3 rounded border text-red-600">✕</button>
            </div>
          ))}
        </div>
        <button onClick={addItem} className="mt-2 rounded bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-colors duration-200">+ Add Item</button>
      </div>
    </div>
  );
}
