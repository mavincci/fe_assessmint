import { Search, SortAsc, SortDesc } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLoadAssessment } from "../../hooks/useLoadMyAssessment";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import { fetch_results_by_assessment_Id, fetch_results_by_assessment_Id_for_examinee, load_my_inivitation } from "../../action/Auth";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";

// Main MyAssessment component
const MyAssessment = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isExaminee = user.roles.some((role) => role === "EXAMINEE");
  const isExaminer = user.roles.some((role) => role === "EXAMINER");
  const dispatch = useDispatch();
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [fetchedresults, setFetchedResults] = useState([]);
  const [AssessmentData, setAssessmentData] = useState([]);

  useLoadAssessment();
  const rawAssessment = useSelector((state) => state.assessment.Assessments);
  console.log("assessmetns", rawAssessment);

  console.log(selectedAssessment);
  const fetch_results = async () => {
    const response = await dispatch(
      fetch_results_by_assessment_Id(selectedAssessment)
    );
    if (response?.body) {
      setFetchedResults(response.body);
      console.log("Feetched results", response.body);
    } else {
      console.log("response", response);
    }
  };

   
  const fetchExamineeAssessment = async () => {
      const res = await dispatch(load_my_inivitation());
      if (res?.body) {
        setAssessmentData(res.body);
        console.log(res.body);
      }
  };
  
  const fetch_results_examinee = async () => {
    if (selectedAssessment) {
           const response = await dispatch(
      fetch_results_by_assessment_Id_for_examinee(selectedAssessment)
    );
    if (response?.body) {
      setFetchedResults(response.body);
      console.log("Feetched results", response.body);
    } else {
      console.log("response", response);
    } 
      }

  };
  useEffect(() => {
    if (isExaminee) {
      fetchExamineeAssessment();
    }
    if (isExaminee) {
      fetch_results_examinee();
    }
    if (selectedAssessment) {
      fetch_results();
    }

  }, [selectedAssessment]);


  return (
    <div className="min-h-screen bg-bg-light p-4 sm:p-6 lg:p-8 antialiased font-display">
      <div className="max-w-9xl rounded-xl  overflow-hidden">
        <h1 className="text-4xl text-start font-bold text-gray-800 p-2 border-gray-200">
          Assessment Results Overview
        </h1>
      { !isExaminee &&   <span className="p-2 text-start font-semibold ">
          {" "}
          View candidates ranked by their performance
        </span> }

 

        <AssessmentTable data={fetchedresults} assessments = {rawAssessment?.body  || AssessmentData} SelectedID = {(id)=>setSelectedAssessment(id)}  Examiner={isExaminer} Examinee = {isExaminee} />
      </div>
    </div>
  );
};

// Define a constant for the passing percentage threshold
const PASS_THRESHOLD = 70; // Example: 70% is considered passing

// SearchableSelect component for autocomplete functionality
const SearchableSelect = ({ options, value, onChange, placeholder, label }) => {
  const [inputValue, setInputValue] = React.useState(value || "");
  const [showOptions, setShowOptions] = React.useState(false);
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Handle clicks outside the component to close the options list
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (option) => {
    setInputValue(option);
    onChange(option);
    setShowOptions(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(""); // Clear the selected value if user is typing
    setShowOptions(true);
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
    setShowOptions(false);
  };

  return (
    <div className="relative flex-grow " ref={wrapperRef}>
      <div className="relative bg-white ">
        <input
          id={`searchable-select-${label}`}
          type="text"
          className="mt-1 block border border-accent-teal-light w-full rounded-md shadow-sm focus:border-accent-teal-dark focus:ring-accent-teal-dark  sm:text-sm p-2 pr-10"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowOptions(true)}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Clear search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </div>
      {showOptions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-indigo-50 hover:text-indigo-700 text-sm"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
      {showOptions && filteredOptions.length === 0 && inputValue && (
        <div className="px-4 py-2 text-sm text-gray-500">
          No matching options
        </div>
      )}
    </div>
  );
};

// AssessmentTable component to display the data with search, sort, and filter
const AssessmentTable = ({ data,assessments,SelectedID,Examiner, Examinee }) => {
  // State to manage which rows are expanded to show attempt details
  const [expandedRows, setExpandedRows] = React.useState({});
  // State for generic search functionality (Examinee Name)
  const [examineeSearchTerm, setExamineeSearchTerm] = React.useState("");
  // State for searchable select for Assessment ID
  const [selectedAssessmentFilter, setSelectedAssessmentFilter] =
    React.useState("");
  // State for sorting functionality
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortDirection, setSortDirection] = React.useState("asc"); // 'asc' or 'desc'
  // State for pass/fail filtering
  const [passFailFilter, setPassFailFilter] = React.useState("all"); // 'all', 'pass', 'fail'

  // Function to toggle the expanded state of a row
  const toggleRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };


  // Helper function to calculate success percentage
  const calculatePercentage = (success, failure, skipped) => {
    const total = success + failure + skipped;
    if (total === 0) {
      return 0; // Return 0 for calculation, 'N/A' for display
    }
    return (success / total) * 100;
  };

  // Helper function to format percentage for display
  const formatPercentage = (percentage) => {
    if (percentage === 0 && (isNaN(percentage) || !isFinite(percentage))) {
      // Check for 0 and non-finite values
      return "N/A";
    }
    return percentage.toFixed(2) + "%";
  };

  // Group attempts by examinee and assessment to find the highest score and corresponding percentage
  const groupedData = React.useMemo(() => {
    return data?.reduce((acc, currentAttempt) => {
      const key = `${currentAttempt.examineeEmail}-${currentAttempt.assessmentId}`;
      if (!acc[key]) {
        acc[key] = {
          examineeName: currentAttempt.examineeName,
          examineeEmail: currentAttempt.examineeEmail,
          assessmentId: currentAttempt.assessmentId,
          attempts: [],
          highestSuccessCount: 0,
          highestScoreAttempt: null, // Store the full attempt object that has the highest success
        };
      }
      acc[key].attempts.push(currentAttempt);
      // Update the highest success count and the corresponding attempt for the current group
      if (currentAttempt.successCount > acc[key].highestSuccessCount) {
        acc[key].highestSuccessCount = currentAttempt.successCount;
        acc[key].highestScoreAttempt = currentAttempt;
      }
      return acc;
    }, {});
  }, [data]); // Recalculate only if data changes

  // Get unique assessment IDs for the searchable select
 const uniqueAssessments = React.useMemo(() => {
  const seenIds = new Set();
  const unique = [];

  assessments?.forEach((item) => {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      unique.push({
        id: item.id,
        title: item.title, // or item.assessmentTitle depending on your data shape
      });
    }
  });

  return unique.sort((a, b) => a.title.localeCompare(b.title)); // optional sort by title
}, [assessments]);


  // Filter and sort data based on current state
  const processedData = React.useMemo(() => {
    let currentData = Object.values(groupedData);

    // 1. Apply Examinee Name Search Filter
    if (examineeSearchTerm) {
      currentData = currentData.filter((group) =>
        group.examineeName
          .toLowerCase()
          .includes(examineeSearchTerm.toLowerCase())
      );
    }

    // 2. Apply Assessment ID Searchable Select Filter
    if (selectedAssessmentFilter) {
      currentData = currentData.filter(
        (group) => group.assessmentId === selectedAssessmentFilter
      );
    }

    // 3. Apply Pass/Fail Filter
    if (passFailFilter !== "all") {
      currentData = currentData.filter((group) => {
        const percentage = group.highestScoreAttempt
          ? calculatePercentage(
              group.highestScoreAttempt.successCount,
              group.highestScoreAttempt.failureCount,
              group.highestScoreAttempt.skippedCount
            )
          : 0; // If no attempt, treat as 0 for filtering

        if (passFailFilter === "pass") {
          return percentage >= PASS_THRESHOLD;
        } else if (passFailFilter === "fail") {
          return percentage < PASS_THRESHOLD;
        }
        return true; // 'all' filter
      });
    }

    // 4. Apply Sorting
    if (sortColumn) {
      currentData.sort((a, b) => {
        let valA, valB;

        if (sortColumn === "highestSuccessCount") {
          valA = a.highestSuccessCount;
          valB = b.highestSuccessCount;
        } else if (sortColumn === "highestScorePercentage") {
          valA = a.highestScoreAttempt
            ? calculatePercentage(
                a.highestScoreAttempt.successCount,
                a.highestScoreAttempt.failureCount,
                a.highestScoreAttempt.skippedCount
              )
            : 0;
          valB = b.highestScoreAttempt
            ? calculatePercentage(
                b.highestScoreAttempt.successCount,
                b.highestScoreAttempt.failureCount,
                b.highestScoreAttempt.skippedCount
              )
            : 0;
        } else {
          // For string sorting (examinee name, email, assessment ID)
          valA = a[sortColumn].toLowerCase();
          valB = b[sortColumn].toLowerCase();
        }

        if (valA < valB) {
          return sortDirection === "asc" ? -1 : 1;
        }
        if (valA > valB) {
          return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return currentData;
  }, [
    groupedData,
    examineeSearchTerm,
    selectedAssessmentFilter,
    passFailFilter,
    sortColumn,
    sortDirection,
  ]); // Re-process when dependencies change

  // Handle sorting column click
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc"); // Default to ascending when changing column
    }
  };

  // Render sort arrow indicator
  const renderSortArrow = (column) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <SortAsc className="w-3 h-4 text-accent-teal-light" />
      ) : (
        <SortDesc className="w-3 h-4 text-red-600" />
      );
    }
    return "";
  };

  const {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    currentItems,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(processedData, 7);
console.log("SelectedID",SelectedID)
  return (
    <div className="p-6">
      {/* Search and Filter Controls */}
      <div className="flex gap-4 items-center w-full max-w-5xl mx-28 my-4  justify-between ">
        
  {/* Search Input */}
  <div className="relative w-72">
    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
      <Search className="h-4 w-4" />
    </span>
    <input
      type="text"
      id="examinee-search-input"
      className="block w-full rounded-md border bg-white border-accent-teal-light shadow-sm pl-10 pr-3 py-3 focus:border-accent-teal-dark focus:ring-accent-teal-dark sm:text-sm h-12"
      placeholder="Search by Examinee Name..."
      value={examineeSearchTerm}
      onChange={(e) => setExamineeSearchTerm(e.target.value)}
    />
        </div>
        <div className="flex gap-9">
  <Autocomplete
    className="w-72"
    options={uniqueAssessments}
    getOptionLabel={(option) => option.title || ""}
    isOptionEqualToValue={(option, value) => option.id === value.id}
    onChange={(e, newVal) => {
      if (newVal) SelectedID(newVal.id);
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Select Assessment"
        variant="outlined"
        sx={{
          "& label": { color: "gray" },
          "& label.Mui-focused": { color: "#286575" },
          "& .MuiInputBase-root": {
            height: 48,
            paddingX: 1.5,
            backgroundColor: "white",
          },
          "& input": { padding: "12px 14px" },
        }}
      />
    )}
    sx={{
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "green",
        },
        "&:hover fieldset": {
          borderColor: "black",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#286575",
        },
      },
    }}
  />


  {/* Pass/Fail Filter */}
  <div className="w-48">
    <select
      id="pass-fail-filter"
      className="block w-full rounded-md bg-white border border-accent-teal-light shadow-sm focus:border-accent-teal-dark focus:ring-accent-teal-dark sm:text-sm py-3 px-5 h-12"
      value={passFailFilter}
      onChange={(e) => setPassFailFilter(e.target.value)}
    >
      <option value="all">All</option>
      <option value="pass">Pass (≥{PASS_THRESHOLD}%)</option>
      <option value="fail">Fail (&lt;{PASS_THRESHOLD}%)</option>
    </select>
  </div>

        </div>
  {/* Autocomplete */}

</div>


      {/* Assessment Results Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100 rounded-tl-lg"
                onClick={() => handleSort("examineeName")}
              >
                <div className="flex items-center gap-1">
                  Examinee Name {renderSortArrow("examineeName")}
                </div>
                {/* Examinee Name {renderSortArrow('examineeName')} */}
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("examineeEmail")}
              >
                <div className="flex items-center gap-1">
                  Examinee Email {renderSortArrow("examineeEmail")}
                </div>
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("highestSuccessCount")}
              >
                <div className="flex items-center gap-1">
                  Highest Score (Success){" "}
                  {renderSortArrow("highestSuccessCount")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("highestScorePercentage")}
              >
                <div className="flex items-center gap-1">
                  Highest Score Percentage{" "}
                  {renderSortArrow("highestScorePercentage")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("examineeEmail")}
              >
                <div className="flex items-center gap-1">Status</div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider rounded-tr-lg"
              >
                Attempts
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Iterate over each grouped assessment result */}
            {currentItems.length > 0 ? (
              currentItems.map((group) => {
                const groupKey = `${group.examineeEmail}-${group.assessmentId}`;
                const isExpanded = expandedRows[groupKey];

                // Calculate percentage for the highest score attempt
                const highestScorePercentageValue = group.highestScoreAttempt
                  ? calculatePercentage(
                      group.highestScoreAttempt.successCount,
                      group.highestScoreAttempt.failureCount,
                      group.highestScoreAttempt.skippedCount
                    )
                  : 0;
                const highestScorePercentageDisplay = formatPercentage(
                  highestScorePercentageValue
                );

                return (
                  <React.Fragment key={groupKey}>
                    {/* Main row for each examinee/assessment group */}
                    <tr
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleRow(groupKey)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {group.examineeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {group.examineeEmail}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                        {group.highestSuccessCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                        {highestScorePercentageDisplay}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap`}>
                        <span
                          className={`${parseFloat(highestScorePercentageDisplay) >= 70 ? "bg-accent-teal-light" : parseFloat(highestScorePercentageDisplay) == 50 ? "bg-[#B78B54]" : "bg-red-500"} p-1 rounded-full text-white text-sm`}
                        >
                          {parseFloat(highestScorePercentageDisplay) >= 70
                            ? "Passed"
                            : parseFloat(highestScorePercentageDisplay) == 50
                              ? "Passed"
                              : "Failed"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-accent-teal-dark hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-accent-teal-light focus:ring-offset-2 rounded-full p-1 transition-transform duration-200"
                          aria-expanded={isExpanded}
                          aria-controls={`attempts-row-${groupKey}`}
                        >
                          {isExpanded ? (
                            <svg
                              className="h-5 w-5 inline-block"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="h-5 w-5 inline-block"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                              ></path>
                            </svg>
                          )}
                          <span className="sr-only">
                            {isExpanded ? "Collapse" : "Expand"} attempts
                          </span>
                        </button>
                      </td>
                    </tr>

                    {/* Detailed attempts row, shown only when expanded */}
                    {isExpanded && (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 bg-gray-50">
                          <div
                            id={`attempts-row-${groupKey}`}
                            className="space-y-4"
                          >
                            <h4 className="text-sm font-semibold text-gray-800 border-b pb-2">
                              🧪 Individual Attempts
                            </h4>

                            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                              {group.attempts.map((attempt) => (
                                <div
                                  key={attempt.attemptId}
                                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 transition hover:shadow-md"
                                >
                                  <div className="mb-2 text-sm font-medium text-indigo-600">
                                    Attempt ID: {attempt.attemptId}
                                  </div>

                                  <ul className="text-sm text-gray-700 space-y-1">
                                    <li className="flex items-center gap-2">
                                      <span className="text-green-600 font-medium">
                                        ✔ Success:
                                      </span>{" "}
                                      {attempt.successCount}
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <span className="text-red-500 font-medium">
                                        ✖ Failure:
                                      </span>{" "}
                                      {attempt.failureCount}
                                    </li>
                                    <li className="flex items-center gap-2">
                                      <span className="text-yellow-500 font-medium">
                                        ⏭ Skipped:
                                      </span>{" "}
                                      {attempt.skippedCount}
                                    </li>
                                    <li className="mt-2 font-semibold text-blue-700">
                                      🎯 Score:{" "}
                                      {formatPercentage(
                                        calculatePercentage(
                                          attempt.successCount,
                                          attempt.failureCount,
                                          attempt.skippedCount
                                        )
                                      )}
                                    </li>
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No results found for the current filters.
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
          
          </tfoot>
        </table>
      </div>
        <Pagination
  totalItems={totalItems}
  currentPage={currentPage}
  totalPages={totalPages}
  itemsPerPage={itemsPerPage}
  handleItemsPerPageChange={handleItemsPerPageChange}
  handlePageChange={handlePageChange}
  indexOfFirstItem={indexOfFirstItem}
  indexOfLastItem={indexOfLastItem}
/>
    </div>
  );
};

export default MyAssessment;
