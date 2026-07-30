import { useState, useEffect } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import Input from "./Input.jsx";
import CategorySuggestButton from "./CategorySuggestButton.jsx";

const AddExpenseForm = ({ onAddExpense, categories, prefill }) => {
    const [expense, setExpense] = useState({
        name: "",
        categoryId: "",
        amount: "",
        date: "",
        icon: "",
    });

    useEffect(() => {
        if (prefill) {
            setExpense((prev) => ({
                ...prev,
                name: prefill.name || prev.name,
                categoryId: prefill.categoryId ? String(prefill.categoryId) : prev.categoryId,
                amount: prefill.amount != null ? String(prefill.amount) : prev.amount,
                date: prefill.date || prev.date,
                icon: prefill.icon || prev.icon,
            }));
        }
    }, [prefill]);

    // Effect to set a default category if categories are loaded and none is selected
    useEffect(() => {
        if (categories && categories.length > 0 && !expense.categoryId) {
            // Automatically select the first category as default if none is chosen
            setExpense((prev) => ({ ...prev, categoryId: categories[0].id })); // Use categories[0].id for MySQL
        }
    }, [categories, expense.categoryId]);

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value }); // Changed setIncome to setExpense

    // Map categories to the format expected by the reusable Input dropdown
    const categoryOptions = categories.map((cat) => ({
        value: cat.id, // Correct for MySQL 'id'
        label: `${cat.name}`, // Display icon and name in dropdown
    }));

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon} // Uses expense.icon now
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Expense Name"
                placeholder="e.g., Electricity, Lunch"
                type="text"
            />

            <CategorySuggestButton
                description={expense.name}
                type="expense"
                onSuggested={({ categoryId, icon }) => {
                    setExpense((prev) => ({
                        ...prev,
                        categoryId: String(categoryId),
                        icon: icon || prev.icon,
                    }));
                }}
            />

            {/* Replaced Input for 'Category' text with a dropdown for 'Category' */}
            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="e.g., 150.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(expense)} // Changed income to expense
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;