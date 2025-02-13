"use client"
import { useState } from "react";

const CostCalculatorPage = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [calculatedCost, setCalculatedCost] = useState<number | null>(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [formData, setFormData] = useState({
    kwhInstalled: "",
    roofType: "",
    roofMaterial: "",
    truckAccess: "",
    lightningRod: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === "kwhInstalled") {
      if (value === '' || /^[1-9]\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => {
    setStep((prev) => prev - 1);

    if (step === 3) {
      setCalculatedCost(null);
      setShowInquiryForm(false);
    }
  } 

  const calculateCost = () => {
    const kwh = Number(formData.kwhInstalled);
    const isSloped = formData.roofType === "sloped";

    if (isNaN(kwh) || kwh <= 0) {
      alert("Please enter a valid number for kWh Installed.");
      return;
    }

    const cost = isSloped
      ? kwh > 4
        ? kwh * 1000
        : kwh * 900
      : kwh > 10
      ? kwh * 900
      : kwh * 1000;

    setCalculatedCost(cost);
    return cost;
  };

  const handleSubmit = () => {
    const cost = calculateCost();
    console.log("Form Data:", { ...formData, cost });
  };

  const sendInquiry = async () => {
    try {
      if (!userEmail) {
        alert("Please provide your email before sending the inquiry.");
        return;
      }
  
      const response = await fetch("/api/sendInquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          additionalInfo,
          formData,
          calculatedCost,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Your inquiry has been sent successfully!");
        setShowInquiryForm(false);
        window.location.href = '/';
      } else {
        alert(`Failed to send inquiry: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred while sending your inquiry.");
    }
  };

  const progress = Math.round((step / totalSteps) * 100);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-gray-50 rounded-md shadow-md">
      <div className="mb-6">
        <div className="relative w-full h-2 bg-gray-300 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Step {step} of {totalSteps}
        </p>
      </div>
      {step === 1 && (
        <div>
          <h1 className="text-xl font-semibold text-gray-700 mb-4">Step 1: Solar Details</h1>
          <p className="text-gray-500 text-sm mb-3">
            Fields marked <span className="text-blue-600">*</span> are required.
          </p>
          <div className="md:flex">
            <label className="block mb-3 w-full md:w-1/2 md:pr-5">
                <span className="text-gray-700">kWh Installed<span className="text-blue-600 text-xl">*</span></span>
                <input
                type="number"
                name="kwhInstalled"
                className="mt-3 px-2 block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.kwhInstalled}
                onChange={handleInputChange}
                min="1"
                required
                />
            </label>
            <label className="block mb-3 w-full md:w-1/2 md:pl-5">
                <span className="text-gray-700">Roof Type<span className="text-blue-600 text-xl">*</span></span>
                <select
                name="roofType"
                className="mt-3 block px-2 w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.roofType}
                onChange={handleInputChange}
                required
                >
                <option value="" disabled>Choose Roof Type</option>
                <option value="sloped">Sloped</option>
                <option value="straight">Straight</option>
                </select>
            </label>
          </div>
          <button
            onClick={nextStep}
            disabled={!formData.kwhInstalled || !formData.roofType}
            className="px-4 mt-5 block py-2 ml-auto bg-blue-600 text-white rounded-md enabled:hover:bg-blue-700 disabled:opacity-80 disabled:pointer-disabled disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Step 2: Roof Details</h2>
          <div className="md:flex">
            <label className="block mb-3 w-full md:w-1/2 md:pr-5">
                <span className="text-gray-700">Roof Material:</span>
                <select
                name="roofMaterial"
                className="mt-3 px-2 block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.roofMaterial}
                onChange={handleInputChange}
                >
                <option value="" disabled>Select Roof Material</option>
                <option value="tile">Tile</option>
                <option value="concrete">Concrete</option>
                <option value="metal">Metal</option>
                <option value="concrete-waterproofing">Concrete with Waterproofing</option>
                </select>
            </label>
            <label className="block mb-3 w-full md:w-1/2 md:pl-5">
                <span className="text-gray-700">Can a truck access the object?</span>
                <select
                name="truckAccess"
                className="mt-3 block px-2 w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.truckAccess}
                onChange={handleInputChange}
                >
                <option value=""disabled >Select truck access availability</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            </label>
          </div>
          <div className="mt-5 flex justify-between">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded-md mr-3 hover:bg-gray-500">
                Back
            </button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Step 3: Additional Details</h2>
          <div className="md:flex">
            <label className="block mb-3 w-full md:w-1/2 md:pr-5">
                <span className="text-gray-700">Is there a lightning rod?</span>
                <select
                name="lightningRod"
                className="mt-3 px-2 block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.lightningRod}
                onChange={handleInputChange}
                >
                <option value=""disabled >Select if a lightning rod is present</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            </label>
            <label className="block mb-3 w-full md:w-1/2 md:pl-5">
                <span className="text-gray-700">Location:</span>
                <input
                type="text"
                name="location"
                className="mt-3 px-2 block w-full h-[30px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.location}
                onChange={handleInputChange}
                />
            </label>
          </div>
          <div className="mt-5 px-2 flex justify-between">
            <button onClick={prevStep} className="px-4 py-2 bg-gray-400 text-white rounded-md mr-3 hover:bg-gray-500">
                Back
            </button>
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Calculate Cost
            </button>
          </div>
        </div>
      )}

      {calculatedCost !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
          <p className="text-lg font-semibold text-gray-800">
            Estimated Cost: <span className="text-blue-600">€{calculatedCost.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-600 mt-3">
            This is just an estimation until our team provides an actual quote.
          </p>
          <button
            onClick={() => setShowInquiryForm(true)}
            className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Send Inquiry
          </button>
        </div>
      )}

      {showInquiryForm && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Send Inquiry</h2>
          <p className="mb-4 text-gray-600">Your inquiry will include the following information:</p>
          <pre className="mb-4 p-3 bg-gray-100 rounded-md text-sm text-gray-800">
        {`
        kWh Installed: ${formData.kwhInstalled || "Not specified"}
        Roof Type: ${formData.roofType === "sloped" ? "Sloped" : "Straight"}
        Roof Material: ${formData.roofMaterial || "Not specified"}
        Truck Access: ${formData.truckAccess || "Not specified"}
        Lightning Rod: ${formData.lightningRod || "Not specified"}
        Location: ${formData.location || "Not specified"}
        Estimated Cost: €${calculatedCost?.toLocaleString() || "Not calculated yet"}
          `}
          </pre>
          <label className="block mb-3">
            <span className="text-gray-700">Your Email<span className="text-blue-600 text-xl">*</span></span>
            <input
              type="email"
              className="mt-1 px-2 block h-[30px] w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </label>
          <label className="block mb-3">
            <span className="text-gray-700">Additional Information:</span>
            <textarea
              className="mt-1 block w-full px-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={4}
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </label>
          <button
            onClick={sendInquiry}
            disabled={!userEmail}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 enabled:hover:bg-blue-700 disabled:opacity-80 disabled:pointer-disabled disabled:cursor-not-allowed"
          >
            Submit Inquiry
          </button>
        </div>
      )}

    </div>
  );
};

export default CostCalculatorPage;
