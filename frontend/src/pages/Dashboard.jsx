import React from "react";

const Dashboard = () => {
    return (
        <div className="container">
            <h1>Recipe Dashboard</h1>
            <section>
                <h2>Recipe Search</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="dietPreferences">Diet Preferences:</label>
                        <input
                            type="text"
                            id="dietPreferences"
                            placeholder="e.g., vegan, keto"
                        />
                    </div>
                    <button type="submit">Search Recipes</button>
                </form>
            </section>
            <section className="recipe-list">
                <h2>Recipes</h2>
                <p>No recipe details available.</p>
            </section>
        </div>
    );
};

export default Dashboard;
