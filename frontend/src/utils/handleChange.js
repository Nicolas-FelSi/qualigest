const handleChange = (e, setFormData, formData) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

export default handleChange;