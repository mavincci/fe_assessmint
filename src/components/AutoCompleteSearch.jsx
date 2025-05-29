import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { load_my_categories, load_my_question_Bank_by_CategoryId } from '../action/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function CategoryRepoAutocomplete({ onRepoSelect, currentType }) {
  const QuestionType= useParams().QuestionType
  const [categories, setCategories] = React.useState([]);
  const [repos, setRepos] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [selectedRepo, setSelectedRepo] = React.useState(null);
  const [loadingCategories, setLoadingCategories] = React.useState(true);
  const [loadingRepos, setLoadingRepos] = React.useState(false);

  const dispatch = useDispatch();
    const res = useSelector((state) => state.bankreducer.BankCategory.body);
  const repo = useSelector((state) => state.bankreducer.BankRepositoryByID.body);
  if (QuestionType) {
    currentType= QuestionType
    
  }
  currentType
console.log(QuestionType)
  // Set categories once fetched from Redux store
  React.useEffect(() => {
    if (res) {
      setCategories(res);
      setLoadingCategories(false);
      }
      if (repo) {
          setRepos(repo);
          setLoadingRepos(false);
      }
  }, [res,repos,repo]);

  // Initial fetch categories
  React.useEffect(() => {
    dispatch(load_my_categories()).catch((err) =>
      console.error('Failed to fetch categories:', err)
    );
  }, [dispatch]);

  // Fetch repos based on selected category
  React.useEffect(() => {
    dispatch(load_my_question_Bank_by_CategoryId(selectedCategory?.id)).catch((err) =>
      console.error('Failed to fetch categories:', err)
    );
  }, [dispatch,selectedCategory]);

  return (
    <div className="flex flex-row gap-4 min-fit space-x-1.5 h-11 ">
      {/* Categories Autocomplete */}
          <Autocomplete
              className='max-w-96 w-72  focus:border-accent-teal-dark'
        options={categories}
              loading={loadingCategories}
              
        getOptionLabel={(option) => option.name || ''}
        onChange={(e, newVal) => {
          setSelectedCategory(newVal);
          setSelectedRepo(null);
        }}
        renderInput={(params) => (
            <TextField
              variant="outlined"

            {...params}
                label="Select Category"
                sx={{
        '& label': {
          color: 'gray', // default
        },
        '& label.Mui-focused': {
          color: '#286575', // on focus
        },'& .MuiInputBase-root': {
      height: 40, // total height
      paddingX: 1.5, // horizontal padding
      paddingY: 0,   // vertical padding if needed
    },
    '& input': {
      padding: '12px 14px', // fine-tune input padding if needed
    },
      }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingCategories && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
              )}
              
                sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'green', // default border
      },
      '&:hover fieldset': {
        borderColor: 'black', // on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#286575', // on focus
          },
  
    },
  }}
      />

      {/* Repositories Autocomplete */}
          <Autocomplete
              className='max-w-96 w-72'
              
        options={repos}
        loading={loadingRepos}
              getOptionLabel={(option) => option.name || ''}
              getOptionDisabled={(option)=>option.questionType !== currentType}
              onChange={(e, newVal) => {
                  setSelectedRepo(newVal)
                   if (onRepoSelect) {
               onRepoSelect(newVal ? newVal.id : null);
      }
              }}
        value={selectedRepo}
        disabled={!selectedCategory}
        renderOption={(props, option) => (
          <li {...props}>
            {option.name} ({option.difficultyLevel}) -  <div className="badge badge-soft badge-info">{option.questionType}</div>
          </li>
        )}
        renderInput={(params) => (
            <TextField
                   sx={{
        '& label': {
          color: 'gray', // default
        },
        '& label.Mui-focused': {
          color: '#286575', // on focus
        },'& .MuiInputBase-root': {
      height: 40, // total height
      paddingX: 1.5, // horizontal padding
      paddingY: 0,   // vertical padding if needed
    },
    '& input': {
      padding: '12px 14px', // fine-tune input padding if needed
    },
      }}
                           
            {...params}
                label="Select Repository"
                
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingRepos && <CircularProgress size={20} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            />
            
              )}
               sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'green', // default border
      },
      '&:hover fieldset': {
        borderColor: 'black', // on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#286575', // on focus
          },
  
    },
  }}
      />
    </div>
  );
}
